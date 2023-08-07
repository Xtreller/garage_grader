import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UserProfileComponent } from '../../users/user-profile/user-profile.component';
import { AddEditServiceComponent } from '../services/add-edit-service/add-edit-service.component';
import { AddEditRoleComponent } from '../roles/add-edit-role/add-edit-role.component';
import { ServicesComponent } from '../services/services.component';
import { GaragesComponent } from '../garages/garages.component';
import { UsersComponent } from '../users/users.component';
import { RolesComponent } from '../roles/roles.component';
import { UserLogComponent } from '../../users/user-log/user-log.component';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent implements ICellRendererAngularComp {
  public cellValue!: string;
  type: any;
  rowData: any;
  parent: GaragesComponent | ServicesComponent | UsersComponent | RolesComponent;
  constructor(private adminService: AdminService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {

  }
  agInit(params: any): void {
    this.type = params.data;
    this.rowData = params.node.data;
    this.parent = params.data.parent;
    console.log(params.node.data);
  }
  openHistory() {
    // this.dialog.open(UserLogComponent);
    // this.adminService.getUserHistory(this.rowData.id).subscribe()
    this.dialog.open(UserLogComponent,
      {
        maxWidth: '600px',
        maxHeight: "960px",
        data: { id: this.rowData.id }
      });
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  edit() {
    let dialog: any;
    switch (this.type) {
      case 'users':
        dialog = this.dialog.open(UserProfileComponent, {
          maxWidth: '600px',
          maxHeight: "960px",
          data: { id: this.rowData.id }
        });
        break;
      case 'garages':
        this.router.navigate(['/garage/edit-garage', this.rowData.id])
        break;
      case 'services':
        dialog = this.dialog.open(AddEditServiceComponent, { data: { id: this.rowData.id } });
        break;
      case 'roles':
        dialog = this.dialog.open(AddEditRoleComponent, {
          data: { id: this.rowData.id }
        });
        break;
    }
    dialog.afterClosed().subscribe((result: boolean) => this.parent.getData());
    console.log(this.type);
  }
  delete() {
    let dialog = this.dialog.open(ConfirmationComponent);
    dialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.adminService.delete(this.type, this.rowData.id)?.subscribe((response: any) => {
          this.snackbar.open('Успешно изтрит запис', '', { duration: 2500 });
        })
      }
    })

  }

}
