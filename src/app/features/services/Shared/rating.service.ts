import { Injectable } from '@angular/core';
import { Rate } from '../../interfaces/Shared/rate';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  apiUrl: string = environment.apiUrl;
  constructor(private http:HttpClient){}

  rate(data:Rate) {
   return this.http.post(this.apiUrl + '/rate',data).pipe(map((response:any)=>response));
  }

}
