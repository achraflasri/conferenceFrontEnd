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
import { FindAConferenceComponent } from './main/find-a-conference/find-a-conference.component';
import { ConferenceInfoComponent } from './main/conference-info/conference-info.component';
import { SubmitAbstractComponent } from './main/submit-abstract/submit-abstract.component';
import { AdminMainComponent } from './main/admin/admin-main/admin-main.component';
import { AdminAssignConfComponent } from './main/admin/admin-assign-conf/admin-assign-conf.component';
import { ChairComponent } from './main/chair/chair.component';
import { ChairMainComponent } from './main/chair/chair-main/chair-main.component';
import { ChairUsersComponent } from './main/chair/chair-users/chair-users.component';




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
            path: 'home', component: AdminMainComponent
          },
          {
            path: 'adminConferences', component: AdminConferenceComponent
          },
          {
            path: 'adminUsers', component: AdminUsersComponent
          },
          {
            path: 'assign', component: AdminAssignConfComponent
          }
        ]
      },
      {
        path: 'chair',
        component: ChairComponent,
        children: [
          {
            path: 'home', component: ChairMainComponent
          },
          {
            path: 'chairUsers', component: ChairUsersComponent
          },
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
        path: 'conferences/find-a-conference',
        component: FindAConferenceComponent,
      },
      {
        path: 'conferences/:title',
        component: ConferenceInfoComponent,
      },
      {
        path: 'conferences/:title/submit-abstract',
        component: SubmitAbstractComponent,
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
