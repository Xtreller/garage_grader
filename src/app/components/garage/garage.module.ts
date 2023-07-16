import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageListComponent } from './garage-list/garage-list.component';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { GarageRoutingModule } from './garage-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorktimeComponent } from './add-garage/worktime/worktime.component';



@NgModule({
  declarations: [GarageListComponent, AddGarageComponent, WorktimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GarageRoutingModule,

  ],
  exports:[GarageListComponent]
})
export class GarageModule { }
