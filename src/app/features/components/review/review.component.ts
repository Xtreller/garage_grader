import { Component, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() id:number;
  constructor(private reviewService:ReviewService){

  }

}
