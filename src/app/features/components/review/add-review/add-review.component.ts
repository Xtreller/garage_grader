import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostReviewData } from 'src/app/features/interfaces/Reviews/postReviewData.interface copy';
import { Review } from 'src/app/features/interfaces/Reviews/review.interface';
import { ReviewService } from 'src/app/features/services/Review/review.service';
import { InfoComponent } from 'src/app/shared/components/info/info.component';

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

  constructor(private reviewService: ReviewService, private modal: MatDialog) { }

  submitReview() {
    let data: PostReviewData = {
      'content': this.review.value,
      'garage_id': this.garage_id,
      'user_id': this.user_id
    }
    this.reviewService.postReview(data).subscribe((response: any) => {
      this.refresh.emit(true);
    });
  }
}
