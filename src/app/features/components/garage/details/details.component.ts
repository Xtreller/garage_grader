import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { Review } from 'src/app/features/interfaces/Reviews/review.interface';
import { GarageService } from 'src/app/features/services/Garage/garage.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  garage: Garage;
  owner: boolean = false;
  reviews: number = 0;
  storageUrl = environment.storageUrl;
  constructor(private garageService: GarageService, private route: ActivatedRoute) {
  }
  getData() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getGarage(id).subscribe((response: any) => {
      this.garage = response.data;
      const user_id = localStorage.getItem("USER_ID");
      if (user_id) {
        this.owner = this.garage.user_id == user_id;
      }
    })
  }
  ngOnInit(){
    this.getData()
  }
  setReviewCount(e:number){
    this.reviews = e;
  }

  ratingChanged($event: any) {
    console.log($event);
  }


}
