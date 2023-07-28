import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  activeRequests: number = 0;
  excludedUrls = [];

  constructor(private loadingScreenService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isInExcludedUrls(request.url)) {
      if (this.activeRequests === 0) {
        this.loadingScreenService.show();
      }

      this.activeRequests++;
      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingScreenService.hide();
          }
        })
      )
    } else {
      return next.handle(request);
    }
  };

  private isInExcludedUrls(requestUrl: string): boolean {
    return !!this.excludedUrls.some(urlFragment => requestUrl.includes(urlFragment));
  }
}
