import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss'],

})
export class AddGarageComponent  {
  form: FormGroup = new FormGroup({});
  title: string = "Добавяне на гараж";
  // panelOpenState = false;
  constructor(private snackbar:MatSnackBar) {
  }

  onSubmit() {
    if(this.form.valid){
      console.log(this.form.value);

    }
    else{
      this.snackbar.open('Моля попълнете задължителните полета!',"",{duration:2500})
    }
  }

}
