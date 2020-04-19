import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
      ProfileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class ProfileModule { }
