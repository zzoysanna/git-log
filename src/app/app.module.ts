import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ProfileModule } from './profile/profile.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from './services/github.service';
import { LoginComponent } from './login/login.component';
import { GithubAuthResolver } from './resolvers/github-auth.resolver';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
  ],
  providers: [
    GithubService,
    GithubAuthResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
