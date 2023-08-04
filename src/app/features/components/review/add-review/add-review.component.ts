import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/components/auth/login/login.component';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { PostReviewData } from 'src/app/features/interfaces/Reviews/postReviewData.interface copy';
import { ReviewService } from 'src/app/features/services/Review/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent {
  @Input() garage_id: number;
  @Output() refresh = new EventEmitter<boolean>();
  review: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  user_name: string | null = localStorage.getItem('USER_NAME');
  user_id: number | null = Number(localStorage.getItem('USER_ID'));

  constructor(private reviewService: ReviewService, private dialog: MatDialog,private auth:AuthService) { }

  submitReview() {
      if(this.auth.isLogged()){

        let data: PostReviewData = {
          'content': this.review.value,
          'garage_id': this.garage_id,
          'user_id': this.user_id
        }
        this.reviewService.postReview(data).subscribe((response: any) => {
          this.refresh.emit(true);
        });
      }else{
        this.dialog.open(LoginComponent);
      }
  }
}
