import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/core/interfaces/Auth/role.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getRole(id: any) {
    return this.http.get(this.apiUrl + '/role/' + id);
  }
  addRole(data: Role) {
    return this.http.post(this.apiUrl + '/role', data);
  }
  editRole(id: number, data: Role) {
    return this.http.put(this.apiUrl + '/role/' + id, data);
  }
  deleteRole(id: number) {
    return this.http.delete(this.apiUrl + '/role/' + id);
  }
}
