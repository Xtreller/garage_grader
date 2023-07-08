import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form:FormGroup;
  constructor(public dialogRef:MatDialogRef<RegisterComponent>,public auth:AuthService,private fb:FormBuilder){
    this.form = this.fb.group({
      name:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
      re_password:new FormControl("",[Validators.required]),
    })

  }
  get f(){return this.form.controls;}
  register(){
    console.log(this.form.value);
    if(this.form.valid){
      this.auth.register().subscribe((data:any)=>{
        console.log(data);
      });
    }
  }

}
