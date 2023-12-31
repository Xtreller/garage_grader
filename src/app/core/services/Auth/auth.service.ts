import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LoginEmitter } from '../../emitters/login_emitter';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = environment.apiUrl ;
  constructor(public http:HttpClient,private router:Router) { }
  isLogged(){
    return !!localStorage.getItem('TOKEN');
  }
  getToken() {
   return localStorage.getItem('TOKEN');
  }
  getLoggedUserId(){
    let user = localStorage.getItem('USER');
    if(user != null){
      return JSON.parse(user).id;
    }
  }
  register(data:any = null){
    return this.http.post(environment.apiUrl +'/register',data);
  }
  login(data:any = null){
    return this.http.post(environment.apiUrl +'/login',data);
  }
  logout(){
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_ID')
    localStorage.removeItem('USER_EMAIL')
    localStorage.removeItem('user_name')
    LoginEmitter.login.emit(false);
    this.router.navigate(['/']);

  }

}
