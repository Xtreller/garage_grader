import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/core/interfaces/Auth/role.interface';
import { environment } from 'src/environment/environment';
import { UsersService } from '../Users/users.service';
import { RoleService } from '../Roles/role.service';
import { GarageService } from '../Garage/garage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl + '/admin';
  constructor(private http: HttpClient, private userService: UsersService, private roleService: RoleService, private garageService: GarageService) { }
  getData(table: string) {
    return this.http.get(this.apiUrl + '/' + table);
  }
  еdit(type: string, id: number, data: any) {
    return this.http.post(this.apiUrl + '/' + type + '/' + id, data);
  }
  delete(type: string, id: number) {
    let request;
    switch (type) {
      case 'users':
        request = this.userService.deleteUser(id)
        break;
      case 'garages':
        request = this.garageService.deleteGarage(id)
        break;
      case 'services':
        // request = this.servicesService.delete(id)
        break;
      case 'roles':
        request = this.roleService.deleteRole(id)
        break;
    }
    return request;
  }
}
