import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { LoaderState } from '../../interfaces/loader-state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  show = false;

  private subscription: Subscription;
  constructor(private loadingService:LoadingService ) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.loaderState
      .subscribe((state: LoaderState) => {
        setTimeout(() => {
          this.show = state.show;
        }, 0);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
