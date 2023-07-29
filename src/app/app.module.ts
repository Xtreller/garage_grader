import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/components/auth/auth.module';
import { GarageModule } from './features/components/garage/garage.module';
import { MaterialModule } from './shared/material/material.module';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { InfoComponent } from './shared/components/info/info.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TruncateTextPipe } from './shared/pipes/truncate-text.pipe';
import { ReviewComponent } from './features/components/review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    LoadingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MaterialModule,
    GarageModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
