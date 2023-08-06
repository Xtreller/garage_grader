import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { GaragesComponent } from './garages/garages.component';
import { ServicesComponent } from './services/services.component';
import { RolesComponent } from './roles/roles.component';
import { AgGridModule } from 'ag-grid-angular';
import { TableActionsComponent } from './table-actions/table-actions.component';


@NgModule({
  declarations: [AdminComponent, UsersComponent, GaragesComponent, ServicesComponent, RolesComponent, TableActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule,
    AgGridModule
  ]
})
export class AdminModule { }
