import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GarageService } from 'src/app/features/services/Garage/garage.service';


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
  get controls(){
    return this.form.controls;
  }
  onSubmit() {
    if(this.form.valid){
      this.garageService.addGarage(this.form.value).subscribe((response:any)=>{
        if(response.status == 'ok'){
          // console.log(response.status);
        }
      });
    }
    else{
      this.snackbar.open('Моля попълнете задължителните полета!',"",{duration:2500})
    }
  }



}
