import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  messages: any
  redirectLink: any
  status: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<InfoComponent>,
    public dialog: MatDialog,
    public router:Router
  ) {
    this.messages = this.data.messages.errors || this.data.messages
    this.status = this.data.status;
    if (this.data.link) {
      this.redirectLink = this.data.link;
    }
  }

  ngOnInit(): void {
  }

}
