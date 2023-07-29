import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { GarageService } from 'src/app/features/services/Garage/garage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  garage: Garage;
  owner:boolean = false;

  constructor(private garageService: GarageService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getGarage(id).subscribe((response: any) => {
      this.garage = response.data;
      const user_id = localStorage.getItem("USER_ID");
      if(user_id){
        this.owner = this.garage.user_id  == user_id;
      }
    })
  }

}
