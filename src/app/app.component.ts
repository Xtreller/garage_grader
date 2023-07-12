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
  userLogged: Boolean = localStorage.getItem('TOKEN')?true:false;
  userName: string | null = localStorage.getItem('user_name') ? localStorage.getItem('user_name') :"";
  constructor(public dialog: MatDialog,public auth:AuthService) {
    LoginEmitter.login.subscribe((result: boolean) => {
      this.userLogged = result;
      this.userName = localStorage.getItem('user_name') ? localStorage.getItem('user_name') :"";
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
