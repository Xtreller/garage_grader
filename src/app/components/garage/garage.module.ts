import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageListComponent } from './garage-list/garage-list.component';



@NgModule({
  declarations: [GarageListComponent],
  imports: [
    CommonModule
  ],
  exports:[GarageListComponent]
})
export class GarageModule { }
