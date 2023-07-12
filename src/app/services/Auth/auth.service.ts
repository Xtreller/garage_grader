import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginEmitter } from 'src/app/emitters/login_emitter';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  register(data:any = null){
    console.log(data);
    return this.http.post(environment.apiUrl +'/api/gg/register',data);
  }
  login(data:any = null){
    console.log(data);
    return this.http.post(environment.apiUrl +'/api/gg/login',data);
  }
  logout(){
    // localStorage.removeItem('user_id')
    console.log('tets');
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_ID')
    localStorage.removeItem('USER_EMAIL')
    localStorage.removeItem('user_name')
    LoginEmitter.login.emit(false);

  }
}
