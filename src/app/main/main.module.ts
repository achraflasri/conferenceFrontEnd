import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminConferenceComponent } from './admin/admin-conference/admin-conference.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    MainComponent,
    AuthorComponent,
    ProfileComponent,
    LandingComponent,
    ConferencesComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    MainComponent,
    MaterialModule
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule { }
