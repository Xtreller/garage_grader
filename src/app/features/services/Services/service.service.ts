import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Service } from '../../interfaces/Services/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  apiUrl = environment.apiUrl + '/services';
  constructor(private http: HttpClient) { }
  getService(id: any) {
    return this.http.get(this.apiUrl + `/${id}`);
  }
  addService(data:Service) {
    return this.http.post(this.apiUrl, data);
  }
  editService(id: any,data:Service) {
    return this.http.put(this.apiUrl + `/${id}`,data);
  }
  deleteService(id: any) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
