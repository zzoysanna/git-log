import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { GlState } from '../store/reducers';
import { AuthLogOnAction } from '../store/actions/auth.actions';
import { CookieService } from 'ngx-cookie-service';
import { GithubService } from './github.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
      private store: Store<GlState>,
      private cookie: CookieService,
      private githubService: GithubService,
      private router: Router,
  ) { }

  public authGithub(): void {
    const REDIRECT_URI = environment.baseUrl + '/callback';
    const ENCODED_REDIRECT_URI = encodeURIComponent(REDIRECT_URI);

    window.location.href = `${environment.githubAuthUrl}?scope=user&client_id=${environment.clientId}&redirect_uri=${ENCODED_REDIRECT_URI}`;
  }

  public login(): void {
    this.store.dispatch(AuthLogOnAction());
  }

  public checkLogin(): void {
    const token = this.cookie.get(environment.accessTokenKey);
    if (token) {
      this.githubService.getUserInfo(token).pipe(
          filter(userInfo => !!userInfo),
      ).subscribe(
          () => {
            this.login();
            this.router.navigateByUrl('/profile');
          },
          error => {
            if(error.status === 401) {
              this.cookie.delete(environment.accessTokenKey);
              this.goToLogin();
            }
          }
      );
    }
    // else {
    //   this.goToLogin();
    // }
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
