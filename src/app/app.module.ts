import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/components/auth/auth.module';
import { GarageModule } from './features/components/garage/garage.module';
import { MaterialModule } from './shared/material/material.module';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './features/components/garage/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
