import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminConferenceComponent } from './admin-conference/admin-conference.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AddComponent } from './admin-conference/dialogs/add/add.component';
import { UpdateComponent } from './admin-conference/dialogs/update/update.component';
import { DeleteComponent } from './admin-conference/dialogs/delete/delete.component';
import { DeleteUserComponent } from './admin-users/dialogs/delete-user/delete-user.component';
import { CreateUserComponent } from './admin-users/dialogs/create-user/create-user.component';
import { UpdateUserComponent } from './admin-users/dialogs/update-user/update-user.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminAssignConfComponent } from './admin-assign-conf/admin-assign-conf.component';




@NgModule({
  declarations: [
    AdminComponent,
    AdminConferenceComponent,
    AdminUsersComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    DeleteUserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    AdminMainComponent,
    AdminAssignConfComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddComponent,
    UpdateComponent
  ]
})
export class AdminModule { }
