import { Component, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginEmitter } from '../../emitters/login_emitter';
import { AuthService } from '../../services/Auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { Role } from '../../interfaces/Auth/role.interface';
import { UserProfileComponent } from 'src/app/features/components/users/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Garage Grader';
  userLogged: Boolean = !!localStorage.getItem('TOKEN');
  userName: string | null = localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') : "";
  role:string | null = localStorage.getItem('USER_ROLE');
  constructor(public dialog: MatDialog, public auth: AuthService) {
    LoginEmitter.login.subscribe((result: boolean) => {
      this.userLogged = result;
      this.userName = localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') : "";
      this.role = localStorage.getItem('USER_ROLE');
    });
  }
  ngOnInit() {
    if (isDevMode()) {
      // console.warn('Development!');
    } else {
      console.warn('Production!');
    }

  }
  openProfile(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width:'500',
      height:'auto',

      data: {id:localStorage.getItem("USER_ID")},
      panelClass: 'mat-dialog-round'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
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
  logout(): void {
    this.auth.logout();
  }
}
