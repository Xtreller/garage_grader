import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/features/interfaces/Users/user.interface';
import { UsersService } from 'src/app/features/services/Users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: User;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService) {
    this.userService.getUser(this.data.id).subscribe((response: any) => {
      this.user = response.data;
    })
  }

}
