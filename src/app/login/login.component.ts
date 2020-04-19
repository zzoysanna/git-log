import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'gl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string;

  constructor(
      private http: HttpClient,
      private auth: AuthService,
  ) { }

  public ngOnInit(): void {
  }

  public gitLogin() {
    this.auth.authGithub();
  }

}
