import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropositionsRoutingModule } from './propositions-routing.module';
import { PropositionsComponent } from './propositions.component';


@NgModule({
  declarations: [PropositionsComponent],
  imports: [
    CommonModule,
    PropositionsRoutingModule
  ]
})
export class PropositionsModule { }
