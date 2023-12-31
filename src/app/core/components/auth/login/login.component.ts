import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginEmitter } from 'src/app/core/emitters/login_emitter';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder, private auth: AuthService, private snackbar: MatSnackBar) {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    })
  }
  get f() { return this.form.controls; }

  openRegistration(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: {},
      width: '600px',
      height: '600',
      panelClass: 'mat-dialog-round'
    });
  }
  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe((response: any) => {
        if (response.status === 'ok') {
          this.snackbar.open('Добре дошли ' + response.user.name + '!', '', { duration: 2500 });
          localStorage.setItem('TOKEN', response.token);
          localStorage.setItem('USER_ID', response.user.id);
          localStorage.setItem('USER_EMAIL', response.user.email);
          localStorage.setItem('USER_NAME', response.user.name);
          localStorage.setItem('favorites', JSON.stringify(response.user.favorites.map((f: any) => f.garage_id)));
          if (response.user.role.name) {
            localStorage.setItem('USER_ROLE', response.user.role.name);
          }
          localStorage.setItem('USER', JSON.stringify(response.user));
          LoginEmitter.login.emit(true);

          this.dialogRef.close();
        }
        else {
          this.snackbar.open(response.message, '', { duration: 2500 });
        }
      })
    }
    else {
      this.snackbar.open("Моля попълнете задължителните полета!", "", { duration: 2000 });
    }

  }
}
