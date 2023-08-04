import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGarageComponent } from './features/components/garage/add-garage/add-garage.component';
import { GarageListComponent } from './features/components/garage/garage-list/garage-list.component';

const routes: Routes = [
  { path: '', component: GarageListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
