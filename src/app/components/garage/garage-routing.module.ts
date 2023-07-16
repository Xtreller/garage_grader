import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageListComponent } from './garage-list/garage-list.component';
import { AddGarageComponent } from './add-garage/add-garage.component';

const routes: Routes = [
  { path: 'garage', component: GarageListComponent },
  { path: 'garage/add-garage', component: AddGarageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
