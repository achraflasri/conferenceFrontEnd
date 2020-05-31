import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessComponent } from "./access.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AccessComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    AccessComponent,
    LoginComponent,
    RegisterComponent,
    MaterialModule,
    FlexLayoutModule
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AccessComponent]
})
export class AccessModule { }
