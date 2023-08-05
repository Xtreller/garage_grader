import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/components/auth/login/login.component';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { Rate } from 'src/app/features/interfaces/Shared/rate';
import { RatingService } from 'src/app/features/services/Shared/rating.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  // @Input('garage_id') id: number;
  @Input('garage_id') ratings: Rate;
  @Output() refresh = new EventEmitter();
  rating: FormGroup;
  constructor(@Inject(DetailsComponent) private parent: DetailsComponent, private fb: FormBuilder, private ratingService: RatingService, private auth: AuthService, private dialog: MatDialog) {
    this.rating = this.fb.group({
      '1': new FormControl(0),
      '2': new FormControl(0),
      '3': new FormControl(0),
      '4': new FormControl(0),
      '5': new FormControl(0)
    })
  }

  ngOnInit(): void {

    this.rating.valueChanges.subscribe((change) => {
      let newRate =  this.getTrueKey(change);
      // this.rating.reset();
      console.log(this.rating,newRate);
      let data: Rate = {
        garage_id: this.parent.garage.id,
        user_id: Number(localStorage.getItem('USER_ID')),
        rate: this.getTrueKey(change)
      }
      // data = Object.assign(data, this.rating.value)

      if (this.auth.isLogged()) {

        this.ratingService.rate(data).subscribe((response: any) => {
          if (response.data || response.status) {
            this.refresh.emit(true);
          }
        })
      } else {
        this.dialog.open(LoginComponent);
      }
    });
  }
  private getTrueKey(obj: any) {
    for (const key in obj) {
      console.log(key);
      if (obj[key]) return +key;
    };
    return 0;
  };
}
