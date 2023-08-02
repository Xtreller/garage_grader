import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { environment } from 'src/environment/environment';
import { GarageFilter } from '../../interfaces/Garage/garage-filter.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GarageService {


  private apiUrl: string = environment.apiUrl;
  constructor(public http: HttpClient, private auth: AuthService) { }
  //ToDo: add data interface
  getGarage(id: number) {
    return this.http.get(this.apiUrl + '/garage/' + id);
  }
  getGarages(user_id: number | null = null) {
    if (user_id) {
      return this.http.get(this.apiUrl + '/garages/' + user_id);
    }
    else {
      return this.http.get(this.apiUrl + '/garage');
    }
  }
  filterGarages(filter:GarageFilter){
    return this.http.post(this.apiUrl + '/garages/filter',filter).pipe(map((response:any)=>response.data));
  }
  getGaragesNames() {
      return this.http.get(this.apiUrl + '/garage/names').pipe(map((response:any)=>response.data));
  }

  addGarage(data: any) {
    return this.http.post(this.apiUrl + '/garage/' + this.auth.getLoggedUserId(), data);
  }
  deleteGarage(id: number) {
    return this.http.delete(this.apiUrl + '/garage/' + id);
  }
  updateGarage(id:number,data: any) {
   return this.http.put(this.apiUrl + '/garage/'+id,data);
  }
}
