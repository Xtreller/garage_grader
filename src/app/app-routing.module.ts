import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGarageComponent } from './components/garage/add-garage/add-garage.component';
import { GarageListComponent } from './components/garage/garage-list/garage-list.component';

const routes: Routes = [
  { path: '', component: GarageListComponent },
  { path: 'add-garage', component: AddGarageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
