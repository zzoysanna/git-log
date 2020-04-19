import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {GlState} from "../store/reducers";
import {Store} from "@ngrx/store";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {log} from "util";

@Component({
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'github login app';

  constructor(
      private auth: AuthService,
  ){}

  public ngOnInit(): void {
    this.auth.checkLogin();
  }
}


