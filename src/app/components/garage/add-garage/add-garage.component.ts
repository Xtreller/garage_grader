import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GarageService } from 'src/app/services/Garage/garage.service';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss'],

})
export class AddGarageComponent  {
  form: FormGroup = new FormGroup({});
  title: string = "Добавяне на гараж";
  // panelOpenState = false;
  constructor(private snackbar:MatSnackBar,private garageService:GarageService) {
  }

  onSubmit() {
    console.log(this.form.valid);
    if(this.form.valid){
      console.log(this.form.value);
      this.garageService.addGarage(this.form.value).subscribe((response:any)=>{
        console.log(response);
        if(response.status == 'ok'){
          console.log(response.status);
        }
      });
    }
    else{
      this.snackbar.open('Моля попълнете задължителните полета!',"",{duration:2500})
    }
  }


}
