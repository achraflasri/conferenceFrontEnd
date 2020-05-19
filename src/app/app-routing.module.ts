import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {AccessComponent} from './access/access.component';
import {LoginComponent} from './access/login/login.component';
import {RegisterComponent} from './access/register/register.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { ChairComponent } from './chair/chair.component';
import { MaterialModule } from 'projects/material/src/public-api';


const routes: Routes = [
  {
    path: 'chair',
    component: ChairComponent,
    children: [
    ]
  },
  {
    path: 'main',
    component: MainComponent,
    children: [

    ]
  },
  {
    path: 'access',
    component: AccessComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'access/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
