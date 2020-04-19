import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import { User } from '../types/User';
import { Store } from '@ngrx/store';
import { GlState } from '../store/reducers';
import { SetUserAction } from '../store/actions/user.actions';
import { Repository } from '../types/Repository';
import { SetReposAction, UpdateRepoAction } from '../store/actions/repos.actions';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private headersList: HttpHeaders;
  private login: string;

  constructor(
      private http: HttpClient,
      private store: Store<GlState>,
  ) { }

  public getUserInfo(token: string): Observable<Repository> {
    if(!this.headersList) {
      this.setHeaders(token);
    }
    return this.http.get(`${environment.githubApi}/user`, this.requestOptions).pipe(
        map((user: any) => {
          this.login = user.login;
          return {id: user.id, login: user.login, avatar: user.avatar_url};
        }),
        tap(user => this.store.dispatch(SetUserAction({data: user}))),
        switchMap(() => this.getRepos()),
    );
  }

  public getRepos(): Observable<Repository> {
    return this.http.get(`${environment.githubApi}/user/repos`, this.requestOptions).pipe(
        map((repos: any) => repos.map(item => this.mapRepo(item))),
        tap(repos => this.store.dispatch(SetReposAction({data: repos}))),
    );
  }

  public getContributors(repo: Repository): Observable<string[]> {
    return this.http.get(
        `${environment.githubApi}/repos/${this.login}/${repo.name}/contributors`,
        this.requestOptions
    ).pipe(
        map((contributors: any) => contributors ? contributors.map(item => item.login) : []),
        tap(contributors => this.store.dispatch(UpdateRepoAction({id: repo.id, contributors}))),
    );
  }

  public setHeaders(token: string): void {
    this.headersList = new HttpHeaders({Authorization: `token ${token}`});
  }

  public get requestOptions(): any {
    return {
      headers: this.headersList,
    };
  }

  private mapRepo(repo: any): Repository {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      createdAt: repo.created_at,
      contributors: null,
    };
  }
}
