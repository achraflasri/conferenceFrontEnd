import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { AccessComponent } from "./access/access.component";
import { LoginComponent } from "./access/login/login.component";
import { RegisterComponent } from "./access/register/register.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AuthorComponent } from './main/author/author.component';
import { AdminComponent } from './main/admin/admin.component';
import { AdminConferenceComponent } from './main/admin/admin-conference/admin-conference.component';
import { AdminUsersComponent } from './main/admin/admin-users/admin-users.component';
import { ProfileComponent } from './main/profile/profile.component';
import { LandingComponent } from './main/landing/landing.component';
import { ConferencesComponent } from './main/conferences/conferences.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: 'adminConferences', component: AdminConferenceComponent
          },
          {
            path: 'adminUsers', component: AdminUsersComponent
          }
        ]
      },
      {
        path: 'author',
        component: AuthorComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'conferences',
        component: ConferencesComponent
      },
      {
        path: 'landing',
        component: LandingComponent
      }
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
    redirectTo: 'main/landing',
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
