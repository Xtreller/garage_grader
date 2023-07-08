import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form:FormGroup;
  constructor(public dialog: MatDialog,public dialogRef:MatDialogRef<LoginComponent>,private fb:FormBuilder) {
    this.form = this.fb.group({
      email:new FormControl("",[Validators.required]),
      re_password:new FormControl("",[Validators.required]),
    })
  }
  get f() { return this.form.controls; }

  openRegistration(): void {
    console.log('test');
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: {},
      width: '600px',
      height: '600',
      panelClass: 'mat-dialog-round'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
