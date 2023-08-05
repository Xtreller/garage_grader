import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../services/Review/review.service';
import { Review } from '../../interfaces/Reviews/review.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditReviewComponent } from './edit-review/edit-review.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input('garage_id') id: number;
  // @Input() sub_reviews?: Review[] = [];
  @Output() reviewsCount =  new EventEmitter<number>();
  reviews: Review[] = [];
  user_id: number | null = Number(localStorage.getItem('USER_ID'));
  constructor(private reviewService: ReviewService, private dialog: MatDialog,private snacbar:MatSnackBar) {
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
      this.reviewsCount.emit(this.reviews.length);
    })
  }
  editReview(id:number,content:string){
    let edit = this.dialog.open(EditReviewComponent,{data:{id,content},width:'450px'});
    edit.afterClosed().subscribe((edited:boolean)=>{
      if(edited){
        this.getData();
      }
    })
  }
  deleteReveiew(id: number) {
    let confirm = this.dialog.open(ConfirmationComponent)
    confirm.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.reviewService.deleteReview(id).subscribe((response: any) => {
          console.log(response);
          if(response.status == 'ok'){
            this.snacbar.open('Успешно изтрит запис!',"",{duration:2500});
            this.getData();
          }
        })
      }
    })
  }

}
