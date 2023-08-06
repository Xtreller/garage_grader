import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, GridApi, GridOptions } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    cellClass:'d-flex flex-row align-items-center'
  };
  users: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getData('users').subscribe((response: any) => {
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
    { headerName: 'Име', field: 'name' },
    { headerName: 'Еmail', field: 'email' },
    { headerName: 'Роля', field: 'role.name' },
    { headerName: 'Регисриран', field: 'created_at' },
    { headerName: 'Действия', field: 'actions', type: 'rightAligned', cellRenderer: TableActionsComponent },
  ];

  rowData = [];

}
