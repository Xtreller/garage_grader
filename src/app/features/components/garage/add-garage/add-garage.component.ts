import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { GarageService } from 'src/app/features/services/Garage/garage.service';


@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss'],

})
export class AddGarageComponent {
  form: FormGroup = new FormGroup({});
  title: string = "Добавяне на гараж";
  url: string;
  garage: Garage | null;
  edit: boolean = false;
  id: number;

  constructor(private snackbar: MatSnackBar, private garageService: GarageService, private router: Router, private route: ActivatedRoute) {
    this.url = this.router.url;
    if(this.url.includes('edit-garage')){
      this.getData();
      this.edit = true;
    }
  }
  get controls() {
    return this.form.controls;
  }
  getData() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getGarage(this.id).subscribe((response:any)=>{
      if(response.data){
        this.garage = response.data;
      }
    })
  }
  onSubmit() {
    if (this.form.valid) {
      if(this.id){
        this.garageService.updateGarage(this.id,this.form.value).subscribe((response: any) => {
          if (response.data) {
            this.router.navigate(['/my-garages']);
          }
        });
      }
      else{
        this.garageService.addGarage(this.form.value).subscribe((response: any) => {
          if (response.data) {
            this.router.navigate(['/']);
          }
        });
      }
    }
    else {
      this.snackbar.open('Моля попълнете задължителните полета!', "", { duration: 2500 })
    }
  }



}
