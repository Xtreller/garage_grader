import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { PicturesData } from 'src/app/features/interfaces/Garage/pictures-data';
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
  formData: FormData = new FormData();
  pictures: FormData;

  constructor(private snackbar: MatSnackBar, private garageService: GarageService, private router: Router, private route: ActivatedRoute) {
    this.url = this.router.url;
    if (this.url.includes('edit-garage')) {
      this.getData();
      this.edit = true;
    }
  }
  get controls() {
    return this.form.controls;
  }
  getData() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getGarage(this.id).subscribe((response: any) => {
      if (response.data) {
        this.garage = response.data;
      }
    })
  }
  onSubmit() {
    this.formData.forEach((value, key) => {
      console.log(key, '=>', value);
    });
    if (this.form.valid) {
      Object.keys((this.controls['main_info'] as FormGroup).value).forEach(key => {
        // console.log('mI', key)
        if (!this.formData.has(key)) {
          this.formData.append(key, (this.controls['main_info'] as FormGroup).get(key)?.value)
        }
      });
      Object.keys((this.controls['worktime'] as FormGroup).value).forEach(key => {
        if (!this.formData.has(key)) {
          this.formData.append(key, (this.controls['worktime'] as FormGroup).get(key)?.value)
        }
      });
      // Object.keys((this. as FormGroup).value).forEach(key => {
      //   // console.log('pctrs', key)
      //   // this.formData.append(key, (this.controls['pictures'] as FormGroup).get(key)?.value)
      // });

      for (var pair of this.formData) { console.log(pair[0] + ', ' + pair[1]); }
      if (this.id) {
        this.garageService.updateGarage(this.id, this.formData).subscribe((response: any) => {
          if (response.data) {
            this.router.navigate(['/my-garages']);
          }
        });
      }
      else {
        this.garageService.addGarage(this.formData).subscribe((response: any) => {
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
  uploadImages(data: PicturesData) {

    switch (data.type) {
      case 'profile':
      case 'cover':
        this.formData.append(data.type, data.files[0]);
        break;
      case 'content':
        for (var file of data.files) {
          console.log(file.name);
          this.formData.append('content[]', file)
        }
        break;
    }
  }


}
