import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { switchMap, tap, filter, takeUntil } from 'rxjs/operators';
import { User } from '../../types/User';
import { Repository } from '../../types/Repository';
import { GithubService } from '../../services/github.service';
import { Subject } from 'rxjs';
import { ClearRepoAction, SelectRepoAction } from '../../store/actions/repos.actions';

@Component({
  selector: 'gl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public repos: Repository[];
  public selectedRepo: Repository;
  private destroy = new Subject();

  constructor(
      private store: Store<GlState>,
      private githubService: GithubService,
  ) { }

  public ngOnInit(): void {
    this.store.select('user').pipe(
        tap(user => this.user = user),
        switchMap(() => this.store.select('repos')),
        takeUntil(this.destroy),
    ).subscribe(
        repos => this.repos = repos,
        error => console.error(error),
    );
  }

  public selectRepo(repo: Repository): void {
    if(this.selectedRepo && this.selectedRepo.id === repo.id) {
      return;
    }
    if(!repo.contributors) {
      this.githubService.getContributors(repo).pipe(
          takeUntil(this.destroy),
          filter(contributors => !!contributors),
      ).subscribe(
          () => this.setSelectedRepo(this.repos.find(item => item.id === repo.id)),
          error => console.error(error),
      );
    } else {
      this.setSelectedRepo(repo);
    }
  }

  public setSelectedRepo(repo: Repository): void {
    this.selectedRepo = repo;
    this.store.dispatch(SelectRepoAction({data: repo}));
  }

  public closeInfoBlock(): void {
    this.selectedRepo = null;
    this.store.dispatch(ClearRepoAction({}));
  }

  public joinContributors(contributors: string[]) {
    return contributors.length ? contributors.join(' ,') : 'no contributors';
  }

  public isSelected(repoId: number): boolean {
    if(this.selectedRepo) {
      return repoId === this.selectedRepo.id;
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
  }

}
