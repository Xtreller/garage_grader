import { Component, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './core/components/auth/login/login.component';
import { LoginEmitter } from './core/emitters/login_emitter';
import { AuthService } from './core/services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Garage Grader';
  constructor(public dialog: MatDialog,public auth:AuthService) {}
  ngOnInit() {
    if (isDevMode()) {
      // console.warn('Development!');
    } else {
      console.warn('Production!');
    }
  }

}
