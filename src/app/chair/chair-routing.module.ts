import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChairModule } from './chair.module';
import { ChairComponent } from './chair.component';

const routes: Routes = [
  {path : '', component: ChairComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChairRoutingModule { }
