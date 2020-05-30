import { NgModule } from '@angular/core';
import { CoreDataComponent } from './core-data.component';
import { CommonModule } from '@angular/common';
import { CuserService } from './cusers/cuser.service';



@NgModule({
  declarations: [CoreDataComponent],
  imports: [
    CommonModule
  ],
  exports: [CoreDataComponent, CuserService]
})
export class CoreDataModule { }
