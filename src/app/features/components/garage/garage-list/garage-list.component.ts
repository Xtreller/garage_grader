import { Component, OnInit } from '@angular/core';
import { GarageService } from 'src/app/features/services/Garage/garage.service';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Rights } from 'src/app/core/interfaces/rights';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss']
})
export class GarageListComponent {

  garageList: Garage[] = [];

  user: string | null = localStorage.getItem('USER');
  rights: Rights;
  constructor(private garageService: GarageService, private router: Router, private snackbar: MatSnackBar) {
    this.getData();
  }
  getData() {
    if (this.router.url.includes('my-garages')) {
      this.garageService.getGarages(Number(localStorage.getItem('USER_ID'))).subscribe((response: any) => {
        this.garageList = response.data;
        if (this.user) {
          this.rights = JSON.parse(this.user).role;
          console.log(this.rights);
        }
      })
    }
    else {
      this.garageService.getGarages().subscribe((response: any) => {
        this.garageList = response.data;
      })
    }
  }
  deleteGarage(id: number) {
    if (this.rights.delete) {
      this.garageService.deleteGarage(id).subscribe((response: any) => {
        console.log(response);
        if (response.status = 'ok') {
          this.getData();
          this.snackbar.open('Гаражът е изтрит успешно!');
        }
      })
    }
    else {
      this.snackbar.open('Вие нямата права за изтриване на ресурс!');
    }
  }
}
