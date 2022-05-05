import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BeachComponent } from './beach/beach.component';
import { WeatherComponent } from './weather/weather.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BannerComponent } from './banner/banner.component';
import {ButtonModule} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AgmCoreModule } from '@agm/core';

import config from "src/assets/config";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SnackbarinterceptorService} from "./services/snackbarinterceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    BeachComponent,
    WeatherComponent,
    BannerComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        ButtonModule,
        CarouselModule,
        NgbModule,
        FormsModule,
        AgmCoreModule.forRoot({
          apiKey: config.AGM_API_KEY
        }),
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SnackbarinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
