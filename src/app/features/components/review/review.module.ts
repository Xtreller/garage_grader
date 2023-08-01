import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EditReviewComponent } from './edit-review/edit-review.component';



@NgModule({
  declarations: [
    ReviewComponent,
    AddReviewComponent,
    EditReviewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }
