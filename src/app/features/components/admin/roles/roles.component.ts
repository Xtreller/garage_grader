import { Component } from '@angular/core';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    cellClass: 'd-flex flex-row align-items-center'
  };
  users: any;

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  getData() {
    this.adminService.getData('roles').subscribe((response: any) => {
      if (response.data) {
        this.gridApi.setRowData(response.data);
      }
    })
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }
  openDialog() {
    let dialog = this.dialog.open(AddEditRoleComponent)
    dialog.afterClosed().subscribe(() => {
      this.getData()
    })
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getData()
    this.sizeToFit()
  }
  columnDefs: ColDef[] = [
    { headerName: 'Id', field: 'id', maxWidth: 100, },
    { headerName: 'Роля', field: 'name' },
    {
      headerName: 'Преглед', field: 'see', valueFormatter: (params: any) => {
        return params.value ? 'Да' : "Не";
      }
    },
    {
      headerName: 'Създаване', field: 'add', valueFormatter: (params: any) => {
        return params.value ? 'Да' : "Не";
      }
    },
    {
      headerName: 'Редакция', field: 'edit', valueFormatter: (params: any) => {
        return params.value ? 'Да' : "Не";
      }
    },
    {
      headerName: 'Изтриване', field: 'delete', valueFormatter: (params: any) => {
        return params.value ? 'Да' : "Не";
      }
    },
    { headerName: 'Действия', field: 'actions', type: 'rightAligned', cellRenderer: TableActionsComponent, cellRendererParams: { data: "roles", parent: this } },
  ];

  rowData = [];
}
