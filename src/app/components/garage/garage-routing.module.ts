import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageListComponent } from './garage-list/garage-list.component';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { authGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [
  { path: 'garage', component: GarageListComponent },
  { path: 'garage/add-garage', component: AddGarageComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
