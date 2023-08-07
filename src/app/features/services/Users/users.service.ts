import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getUser(id: number) {
    return this.http.get(this.apiUrl + '/user/' + id);
  }
  getUserLog(user_id: number) {
    return this.http.get(this.apiUrl + '/user/log/' + user_id);
  }
  deleteUser(user_id: number) {
    return this.http.delete(this.apiUrl + '/user' + user_id);
  }
}
