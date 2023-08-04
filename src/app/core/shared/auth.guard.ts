import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/auth/login/login.component';
@Injectable({providedIn:"root"})
export class authGuard implements CanActivate {
  constructor(public auth: AuthService,public dialog:MatDialog) {}
  canActivate(): boolean {
    if (!this.auth.isLogged()) {
      this.dialog.open(LoginComponent);
      return false;
    }
    return true;
  }
}
