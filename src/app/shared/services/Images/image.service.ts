import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient) { }
  getImage(type: string, id: number) {
    return this.http.get(this.apiUrl + '/' + type + '/' + id);
  }
  uploadImage(data: any) {
    return this.http.post(this.apiUrl + '/' + data.get('type') + '/' + data.get('related_id'), data);
  }
  removeImage(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
