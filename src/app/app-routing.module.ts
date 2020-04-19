import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { GithubAuthResolver } from './resolvers/github-auth.resolver';


const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'callback',
    resolve: {
      auth: GithubAuthResolver,
    },
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
