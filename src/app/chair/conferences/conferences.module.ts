import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConferencesRoutingModule } from './conferences-routing.module';
import { ConferencesComponent } from './conferences.component';


@NgModule({
  declarations: [ConferencesComponent],
  imports: [
    CommonModule,
    ConferencesRoutingModule
  ]
})
export class ConferencesModule { }
