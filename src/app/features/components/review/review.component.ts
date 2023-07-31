import { Component, Input, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../services/Review/review.service';
import { Review } from '../../interfaces/Reviews/review.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() id: number;
  // @Input() sub_reviews?: Review[] = [];
  reviews: Review[] = [];
  user_id: number | null = Number(localStorage.getItem('USER_ID'));
  constructor(private reviewService: ReviewService) {
    console.log(this.id)

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.getData();
    }
  }
  getData() {
    this.reviewService.getReviews(this.id).subscribe((response: any) => {
      this.reviews = response.data;
    })
  }

}
