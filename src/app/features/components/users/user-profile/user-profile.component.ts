import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/features/interfaces/Reviews/review.interface';
import { User } from 'src/app/features/interfaces/Users/user.interface';
import { ReviewService } from 'src/app/features/services/Review/review.service';
import { UsersService } from 'src/app/features/services/Users/users.service';
import { Image } from 'src/app/shared/interfaces/Images/image';
import { ImageService } from 'src/app/shared/services/Images/image.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: User;
  userReviews: Review[];
  file: File;
  remove: boolean = false;
  image: Image | null;
  storagePath: string = environment.storageUrl;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService, private imageService: ImageService) {
    let hasUser = localStorage.getItem('USER');
    if (hasUser) {
      this.user = JSON.parse(hasUser);
      this.imageService.getImage('user', this.user.id).subscribe((response: any) => {
        if (response.image) {
          this.image = response.image;
          this.remove = true;
        }
      })
    }
  }
  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = files[0];

      this.remove = true;
      this.upload();

    }

  }
  upload() {
    let formData = new FormData();
    formData.append('related_id', this.user.id.toString());
    formData.append('type', 'user');
    formData.append('user', this.file);
    this.imageService.uploadImage(formData).subscribe((response: any) => {
      if (response.image) {
        this.image = response.image;
      }
    });
  }
  resetInput() {
    this.remove = false;
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    this.image ? this.imageService.removeImage(this.image.id).subscribe((response: any) => {
        if (response.status == 'ok') {
          this.image = null;
        }

      }) : "";
    if (input) {
      input.value = "";
    }
  }

}
