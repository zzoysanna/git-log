import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { GlState } from '../store/reducers';
import { Store } from '@ngrx/store';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private store: Store<GlState>,
      private router: Router,
  ){}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select('auth').pipe(
        tap(auth => {
          if (!auth) {
            this.router.navigateByUrl('/login');
            return false;
          }
          return true;
        }),
    );
  }
}
