import { Component, OnInit } from '@angular/core';
import { GarageService } from 'src/app/features/services/Garage/garage.service';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Rights } from 'src/app/core/interfaces/rights';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditReviewComponent } from '../../review/edit-review/edit-review.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss']
})
export class GarageListComponent {

  garageList: Garage[] = [];
  storageUrl = environment.storageUrl;

  user: string | null = localStorage.getItem('USER');
  rights: Rights;
  favorites: number[] = [];
  editable: boolean = false;
  constructor(private garageService: GarageService, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog, private auth: AuthService) {
    this.getData();
  }
  getData() {
    if (this.router.url.includes('my-garages')) {
      this.garageService.getGarages(Number(localStorage.getItem('USER_ID'))).subscribe((response: any) => {
        this.garageList = response.data;
        if (this.user) {
          this.rights = JSON.parse(this.user).role;
          this.editable = true;

          console.log(this.rights);
        }
      })
    }
    else if (this.router.url.includes('favorites')) {
      this.garageService.getUserFavorite().subscribe((response: any) => {
        this.garageList = response.data;
        if (this.user) {
          this.rights = JSON.parse(this.user).role;
          console.log(this.rights);
        }
      })
    }
    else {
      this.garageService.getGarages().subscribe((response: any) => {
        this.garageList = response.data.sort((a: Garage, b: Garage) => b.rate - a.rate);
      })
    }
    if (this.auth.isLogged()) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || "[]");

    }
  }
  setGarages(data: Garage[]) {
    this.garageList = data;

  }
  favorite(id: number) {
    this.garageService.favorite(id).subscribe((resp: any) => {
      if (resp.data || resp.status) {
        this.garageService.getFavorites().subscribe((response: any) => {
          if (response.data) {
            this.favorites = response.data.map((f: any) => f.garage_id);
            localStorage.setItem('favorites',JSON.stringify(this.favorites));
            this.getData()
          }
        });
      }
    });
  }
  deleteGarage(id: number) {
    if (this.rights.delete) {
      let confirm = this.dialog.open(ConfirmationComponent);
      confirm.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.garageService.deleteGarage(id).subscribe((response: any) => {
            if (response.status = 'ok') {
              this.getData();
              this.snackbar.open('Гаражът е изтрит успешно!', "", { duration: 2500 });
            }
          })
        }
      })
    }
    else {
      this.snackbar.open('Вие нямата права за изтриване на ресурс!');
    }
  }
}
