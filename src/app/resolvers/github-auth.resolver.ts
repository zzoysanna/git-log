import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { tap, map } from 'rxjs/operators';
import { GithubService } from '../services/github.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class GithubAuthResolver implements Resolve<any> {
    constructor(
        private http: HttpClient,
        private cookie: CookieService,
        private githubService: GithubService,
        private authService: AuthService,
        private router: Router,
    ) {
    }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any {

        const { code } = route.queryParams;

        this.http.get(`${environment.oauthUrl}?code=${code}`).pipe(
            map(token => String(token)),
            tap(token => this.cookie.set(environment.accessTokenKey, token)),
            tap(() => this.authService.checkLogin()),
        ).subscribe(
            () => this.router.navigateByUrl('/profile'),
            err => console.error(err),
        );
    }
}
