import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminConferenceComponent } from './admin/admin-conference/admin-conference.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FindAConferenceComponent } from './find-a-conference/find-a-conference.component';
import { ConferenceInfoComponent } from './conference-info/conference-info.component';
import { SubmitAbstractComponent } from './submit-abstract/submit-abstract.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UpdatePropositionComponent } from './author/dialogs/update-proposition/update-proposition.component';
import { DeletePropositionComponent } from './author/dialogs/delete-proposition/delete-proposition.component';
import { ChairModule } from './chair/chair.module';
import { ChairComponent } from './chair/chair.component';



@NgModule({
  declarations: [
    MainComponent,
    AuthorComponent,
    ProfileComponent,
    LandingComponent,
    FindAConferenceComponent,
    ConferenceInfoComponent,
    LoadingSpinnerComponent,
    SubmitAbstractComponent,
    UpdatePropositionComponent,
    DeletePropositionComponent
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
    AdminModule,
    ChairModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule { }
