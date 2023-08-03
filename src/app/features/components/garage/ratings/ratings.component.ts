import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rate } from 'src/app/features/interfaces/Shared/rate';
import { RatingService } from 'src/app/features/services/Shared/rating.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  @Input('garage_id') id: number;
  rating: FormGroup;
  constructor(private fb: FormBuilder, private ratingService: RatingService) {
    this.rating = this.fb.group({
      rate:new FormControl()
    })
  }
  get f(){
      return this.rating.controls;
  }
  ngOnInit(): void {
    this.rating.valueChanges.subscribe((change) => {
      console.log('cgnae',change);
      let data: Rate = {
        garage_id: this.id,
        user_id: Number(localStorage.getItem('USER_ID')),
        rate:0
      }
      // data = Object.assign(data, this.rating.value)
      console.log(this.rating.value);
      console.log(data);
      this.ratingService.rate(data).subscribe((response: Response) => {
        console.log(response)
      })
    });
  }
}
