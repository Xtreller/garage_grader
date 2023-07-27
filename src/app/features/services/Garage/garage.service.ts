import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { environment } from 'src/environment/environment';
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
  getGarages() {
    return this.http.get(this.apiUrl + '/garage');
  }
  addGarage(data: any) {
    return this.http.post(this.apiUrl + '/garage/' + this.auth.getLoggedUserId(), data);
  }
}
