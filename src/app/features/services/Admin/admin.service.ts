import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl + '/admin';
  constructor(private http:HttpClient) { }
  getData(table:string){
    return this.http.get(this.apiUrl +'/'+table);
  }

}
