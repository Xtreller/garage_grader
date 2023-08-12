import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/shared/auth.guard';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { GarageListComponent } from './garage-list/garage-list.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: GarageListComponent },
  { path: 'my-garages', component: GarageListComponent, canActivate: [authGuard] },
  { path: 'favorites', component: GarageListComponent, canActivate: [authGuard] },
  { path: 'garage/add-garage', component: AddGarageComponent, canActivate: [authGuard] },
  { path: 'garage/edit-garage/:id', component: AddGarageComponent, canActivate: [authGuard] },
  { path: 'garage/details/:id', component: DetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class GarageRoutingModule { }
