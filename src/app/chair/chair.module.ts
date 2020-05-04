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


@NgModule({
  declarations: [ChairComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UiLoginModule,
    ChairRoutingModule,
  ],
  exports: [
    ChairComponent
  ]
})
export class ChairModule { }
