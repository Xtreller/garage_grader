import { Component } from '@angular/core';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    cellClass:'d-flex flex-row align-items-center'
  };
  users: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getData('roles').subscribe((response: any) => {
      if (response.data) {
        this.rowData = response.data;
      }
    })
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.sizeToFit()
  }
  columnDefs: ColDef[] = [
    { headerName: 'Id', field: 'id', maxWidth: 100, },
    { headerName: 'Роля', field: 'name' },
    { headerName: 'Преглед', field: 'see' },
    { headerName: 'Създаване', field: 'add' },
    { headerName: 'Редакция', field: 'edit' },
    { headerName: 'Изтриване', field: 'delete' },
    { headerName: 'Действия', field: 'actions', type: 'rightAligned', cellRenderer: TableActionsComponent },
  ];

  rowData = [];
}
