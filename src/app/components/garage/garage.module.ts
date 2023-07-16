import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageListComponent } from './garage-list/garage-list.component';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { GarageRoutingModule } from './garage-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorktimeComponent } from './add-garage/worktime/worktime.component';
import { MainInfoComponent } from './add-garage/main-info/main-info.component';
import { PicturesComponent } from './add-garage/pictures/pictures.component';
import { MatTimepickerModule } from 'mat-timepicker';



@NgModule({
  declarations: [GarageListComponent, AddGarageComponent, WorktimeComponent, MainInfoComponent, PicturesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GarageRoutingModule,
    MatTimepickerModule
  ],
  exports:[GarageListComponent]
})
export class GarageModule { }
