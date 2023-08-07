import { Component } from '@angular/core';
import { GridApi, ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { AddEditServiceComponent } from './add-edit-service/add-edit-service.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    cellClass: 'd-flex flex-row align-items-center'
  };
  columnDefs: ColDef[] = [
    { headerName: 'Id', field: 'id', maxWidth: 100, },
    { headerName: 'Име', field: 'name' },
    { headerName: 'Еmail', field: 'email' },
    { headerName: 'Роля', field: 'role.name' },
    { headerName: 'Действия', field: 'actions', type: 'rightAligned', cellRenderer: TableActionsComponent, cellRendererParams: { data: "services", parent: this } },
  ];

  rowData = [];
  users: any;
  gridOptions: GridOptions = {
    rowHeight: 45,
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    rowData: [],
    onGridReady: (e) => this.onGridReady(e)
  }
  constructor(private adminService: AdminService, private dialog: MatDialog) { }


  ngOnInit(): void { }

  getData() {
    this.adminService.getData('services').subscribe((response: any) => {
      if (response.data) {
        this.gridApi.setRowData(response.data);
      }
    })
  }

  openDialog() {
    let dialog = this.dialog.open(AddEditServiceComponent);
    dialog.afterClosed().subscribe(() => {
      console.log('test');
      this.getData()
    });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getData()
    this.sizeToFit()
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }

}
