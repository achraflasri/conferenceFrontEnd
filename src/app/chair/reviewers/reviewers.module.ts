import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewersRoutingModule } from './reviewers-routing.module';
import { ReviewersComponent } from './reviewers.component';


@NgModule({
  declarations: [ReviewersComponent],
  imports: [
    CommonModule,
    ReviewersRoutingModule
  ]
})
export class ReviewersModule { }
