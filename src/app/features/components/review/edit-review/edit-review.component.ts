import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/features/services/Review/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent {
  review: FormControl = new FormControl("", [Validators.required, Validators.minLength(10)]);
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditReviewComponent>,
    private reviewService: ReviewService) {
    this.review.setValue(this.data.content);
  }
  submit() {
    console.log(this.data, this.review.value)
    if (this.review.valid) {
      this.reviewService.editReview(this.data.id, this.review.value).subscribe((response: any) => {
        if(response.data){
          this.dialogRef.close(true);
        }
      })
    }

  }
}
