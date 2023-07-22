import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/shared/auth.guard';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { GarageListComponent } from './garage-list/garage-list.component';


const routes: Routes = [
  { path: 'garage', component: GarageListComponent },
  { path: 'garage/add-garage', component: AddGarageComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
