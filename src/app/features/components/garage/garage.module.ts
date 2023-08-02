import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from 'mat-timepicker';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { MainInfoComponent } from './add-garage/main-info/main-info.component';
import { PicturesComponent } from './add-garage/pictures/pictures.component';
import { WorktimeComponent } from './add-garage/worktime/worktime.component';
import { GarageListComponent } from './garage-list/garage-list.component';
import { GarageRoutingModule } from './garage-routing.module';
import { DetailsComponent } from './details/details.component';
import { TruncateTextPipe } from 'src/app/shared/pipes/truncate-text.pipe';
import { ReviewModule } from '../review/review.module';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [GarageListComponent, AddGarageComponent, WorktimeComponent, MainInfoComponent, PicturesComponent, DetailsComponent,TruncateTextPipe, FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GarageRoutingModule,
    MatTimepickerModule,
    ReviewModule
  ],
  exports:[GarageListComponent]
})
export class GarageModule { }
