import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminConferenceComponent } from './admin-conference/admin-conference.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AppRoutingModule } from 'src/app/app-routing.module';




@NgModule({
  declarations: [
    AdminComponent,
    AdminConferenceComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class AdminModule { }
