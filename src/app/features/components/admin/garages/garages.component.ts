import { Component } from '@angular/core';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.scss']
})
export class GaragesComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    cellClass:'d-flex flex-row align-items-center'
  };
  users: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getData('garages').subscribe((response: any) => {
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
    { headerName: 'Тип', field: 'type' },
    { headerName: 'Създаден от', field: 'user.name' },
    { headerName: 'Телефон', field: 'phone' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Създаден на', field: 'created_at' },
    { headerName: 'Действия', field: 'actions', type: 'rightAligned', cellRenderer: TableActionsComponent },
  ];

  rowData = [];
}
