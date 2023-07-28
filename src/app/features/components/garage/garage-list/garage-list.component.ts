import { Component, OnInit } from '@angular/core';
import { GarageService } from 'src/app/features/services/Garage/garage.service';
import  Garage  from 'src/app/features/interfaces/Garage/garage.interface';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss']
})
export class GarageListComponent implements OnInit {

  garageList:Garage[] = [];
  constructor(private garageService: GarageService) {

  }
  ngOnInit(): void {
      this.garageService.getGarages().subscribe((response:any)=>{
          this.garageList = response.data;
      })
  }
}
