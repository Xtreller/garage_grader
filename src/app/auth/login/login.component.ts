import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form:FormGroup;
  constructor(public dialog: MatDialog,public dialogRef:MatDialogRef<LoginComponent>,private fb:FormBuilder,private auth:AuthService,private snackbar:MatSnackBar) {
    this.form = this.fb.group({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(5)]),
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
  login(){
    if(this.form.valid){
        this.auth.login(this.form.value).subscribe((response:any)=>{
          console.log(response.status ==='ok');
          if(response.status ==='ok'){
            this.snackbar.open('Добре дошли ' + response.user.name + '!','',{duration:2500});
            localStorage.setItem('jwt_token',response.user.id);
            localStorage.setItem('user_name',response.user.name);
            //TODO: add roles
            // localStorage.setItem('user_role_id',response.user.id);
            //TODO: set admin in be
            // localStorage.setItem('admin',response.user);

            this.dialogRef.close();
          }
          else{
            this.snackbar.open(response.message,'',{duration:2500});
          }
        })
    }
    else{
      this.snackbar.open("Моля попълнете задължителните полета!","",{duration:2000});
    }

  }
}
