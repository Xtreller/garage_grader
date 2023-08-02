import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GarageFilter } from 'src/app/features/interfaces/Garage/garage-filter.interface';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { GarageService } from 'src/app/features/services/Garage/garage.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() data = new EventEmitter();
  filter: FormGroup;
  garages: string[];
  filteredGarages: string[];
  names: any;
  types: any;
  towns: any;
  filteredTypes: any;
  filteredTowns: any;
  constructor(private fb: FormBuilder, private garageService: GarageService) {
    this.filter = this.fb.group({
      name: "",
      town: "",
      type: ""
      // name:[""],
    })

  }
  ngOnInit(): void {
    this.garageService.getGaragesNames().subscribe((data: any) => {
      this.names = data.names;
      this.types = data.types;
      this.towns = data.towns;
    })
    this.f['name'].valueChanges
      .subscribe((change: any) => {
        this.filteredGarages = this.names.filter((g_name: string) => g_name.toLowerCase().includes(change.toLowerCase()));
      })
    this.f['type'].valueChanges
      .subscribe((change: any) => {
        this.filteredTypes = this.types.filter((g_type: string) => g_type.toLowerCase().includes(change.toLowerCase()));
      })
    this.f['town'].valueChanges
      .subscribe((change: any) => {
        this.filteredTowns = this.towns.filter((g_town: string) => g_town.toLowerCase().includes(change.toLowerCase()));
      })
  }
  get f() {
    return this.filter.controls;
  }
  optionSelected() {
    this.garageService.filterGarages(this.filter.value).subscribe((data: Garage[]) => this.data.emit(data));
  }
}
