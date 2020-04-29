import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccessComponent} from "./access.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AccessComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    AccessComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AccessComponent]
})
export class AccessModule { }
