import { Component, Inject, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Log } from 'src/app/features/interfaces/Users/log';
import { UsersService } from 'src/app/features/services/Users/users.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent {
  logs: Log[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private userService: UsersService) {
    this.userService.getUserLog(data.id).subscribe((response: any) => {
      if (response.data) {
        this.logs = response.data;
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['logs']) {
      // this.getData();
    }
  }
}
