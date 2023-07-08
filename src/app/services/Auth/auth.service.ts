import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  register(data:any = null){
    console.log(environment.apiUrl);
    return this.http.post(environment.apiUrl +'/register',data);
  }
}
