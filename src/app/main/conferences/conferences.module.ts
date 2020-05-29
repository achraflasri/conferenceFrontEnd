import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferencesComponent } from './conferences.component';
import { ConferenceInfoComponent } from './conference-info/conference-info.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { ConfComponent } from './conf/conf.component';



@NgModule({
  declarations: [
    ConferencesComponent,
    ConferenceInfoComponent,
    ConfComponent
  ],
  exports: [
    ConferencesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class ConferencesModule { }
