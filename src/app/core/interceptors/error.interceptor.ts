import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from 'src/app/shared/components/info/info.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackbar:MatSnackBar,private dialog:MatDialog,private router:Router,private auth:AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.auth.logout();
          this.snackbar.open('Изтекла сесия...', '', {
            duration: 2500
          });
          this.router.navigate(['/']);
        }
        if (error.status === 401) {
          this.auth.logout();
          this.snackbar.open('Нямате достъп до този ресурс', '', {
            duration: 3000
          });
          this.router.navigate(['/']);
        }
        if (error.status === 500) {
          this.snackbar.open('Възникна сървърна грешка. Администраторите са уведомени.', '', {
            duration: 5000
          });
        }
        if (error.status == 422) {
          console.log(error);
          this.dialog.open(InfoComponent, {
            data: {
              messages: error.error,
              status: error.status
            },
            width:'700px',
            minHeight:"300px",
            height:'auto'
          })
        }

        return throwError(error);
      })
    );
  }
}
