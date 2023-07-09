import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form:FormGroup;
  constructor(public dialogRef:MatDialogRef<RegisterComponent>,public auth:AuthService,private fb:FormBuilder,private snackbar:MatSnackBar){
    this.form = this.fb.group({
      name:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),
      re_password:new FormControl("",[Validators.required]),
    })

  }
  get f(){return this.form.controls;}
  register(event:Event){
    event.preventDefault();
    console.log(this.form.value);
    if(this.form.valid){
      this.auth.register(this.form.value).subscribe((response:any)=>{
        console.log(response);
        if(response.status === 'ok'){
            this.snackbar.open("Успешно се регистрирахте!","close",{duration:2500});
            this.dialogRef.close();
        }
      });
    }
    else{
      this.snackbar.open("Моля попълнете задължителните полета!","",{duration:2000});
    }
  }

}
