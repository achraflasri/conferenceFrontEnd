import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChairRoutingModule } from './chair-routing.module';
import { ChairComponent } from './chair.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChairMainComponent } from './chair-main/chair-main.component';
import { ChairUsersComponent } from './chair-users/chair-users.component';
import { CreateUserComponent } from './chair-users/dialogs/create-user/create-user.component';
import { DeleteUserComponent } from './chair-users/dialogs/delete-user/delete-user.component';
import { UpdateUserComponent } from './chair-users/dialogs/update-user/update-user.component';


@NgModule({
  declarations: [ChairComponent, ChairMainComponent, ChairUsersComponent, CreateUserComponent, DeleteUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChairModule { }
