import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient) { }
  removeImage(id: number) {
    console.log(id);
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
