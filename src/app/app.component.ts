import { Component, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'garage_grader';

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {},
      width: '600px',
      height: '600',
      panelClass: 'mat-dialog-round'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
