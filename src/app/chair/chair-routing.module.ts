import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChairModule } from './chair.module';
import { ChairComponent } from './chair.component';

const routes: Routes = [
  { path: '', loadChildren: './conferences/conferences.module#ConferencesModule'},
  { path: 'conferences', loadChildren: './conferences/conferences.module#ConferencesModule'},
  { path: 'reviewers', loadChildren: './reviewers/reviewers.module#ReviewersModule'},
  { path: 'propositions', loadChildren: './propositions/propositions.module#PropositionsModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChairRoutingModule { }
