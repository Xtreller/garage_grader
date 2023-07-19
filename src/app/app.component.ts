import { Component, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
import { LoginEmitter } from './emitters/login_emitter';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'garage_grader';
  userLogged: Boolean = !!localStorage.getItem('TOKEN');
  userName: string | null = localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') :"";
  constructor(public dialog: MatDialog,public auth:AuthService) {
    console.log('test',this.userLogged);

    LoginEmitter.login.subscribe((result: boolean) => {
      this.userLogged = result;
      this.userName = localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') :"";
    });
  }
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
  logout():void {
    console.log('logout')
    this.auth.logout();
  }
}
