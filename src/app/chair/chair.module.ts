import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChairRoutingModule } from './chair-routing.module';
import { ChairComponent } from './chair.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'projects/material/src/public-api';
import { UiLoginModule } from 'projects/ui-login/src/lib/ui-login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConferencesModule } from './conferences/conferences.module';
import { PropositionsModule } from './propositions/propositions.module';
import { ReviewersModule } from './reviewers/reviewers.module';


@NgModule({
  declarations: [ChairComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    ChairRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ConferencesModule,
    PropositionsModule,
    ReviewersModule,
    UiLoginModule,
  ],
  exports: [
    ChairComponent
  ],
  providers: [],
  bootstrap: [ChairComponent]
})
export class ChairModule { }
