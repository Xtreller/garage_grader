import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  selected: FormControl = new FormControl(0);
  tabs: string[] = ['Потребители', 'Гаражи','Типове сервизи'];
}
