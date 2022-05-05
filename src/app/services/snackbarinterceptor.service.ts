import { Injectable, Injector } from '@angular/core';
import { HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import config from "src/assets/config";

import { catchError, tap, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarinterceptorService implements HttpInterceptor {

  successTime = 3000;
  warningTime = 4000;
  errorTime = 5000;

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(e => {
        if (request.method == "GET") {
          if(request.url.includes(config.API_OPENWEATHERMAP)) {
            if (e instanceof HttpResponse && e.status == 200)
              this.snackBar.open(config.SUCCESS_OPENWEATHERMAP, 'close',
                { duration: this.successTime, panelClass: 'successSnack' });
          }
          else if(request.url.includes(config.URL_BEACHES)) {
/*            if (e instanceof HttpResponse && e.status == 200) {
              this.snackBar.open(config.SUCCESS_BEACHES, 'close',
                { duration: 2000, panelClass: 'successSnack' });
            }*/
            if (e instanceof HttpResponse && e.status == 204) {
              this.snackBar.open(config.WARNING_EMPTY_BEACH_LIST, 'close',
                {duration: this.warningTime, panelClass: 'warningSnack'});
            }
          }
          else if(request.url.includes(config.API_WEATHERBIT)) {
            if (e instanceof HttpResponse && e.status == 200)
              setTimeout(() => {
                this.snackBar.open(config.SUCCESS_WEATHERBIT, 'close',
                  { duration: this.successTime, panelClass: 'successSnack' });
              }, 2000);
            else if (e instanceof HttpResponse && e.status == 204) {
              setTimeout(() => {
                this.snackBar.open(config.ERROR_CITY_NOT_FOUND_WB, 'close',
                  { duration: this.errorTime, panelClass: 'errorSnack' });
              }, 1000);
            }
          }
        }
        if (request.method == "DELETE") {
          if(request.url.includes(config.URL_BEACHES)) {
            if (e instanceof HttpResponse && e.status == 200)
              this.snackBar.open(config.SUCCESS_DELETE_BEACH, 'close',
                { duration: this.successTime, panelClass: 'successSnack' });
          }
        }
      }),
      catchError(error => {
        if (request.url.includes(config.API_OPENWEATHERMAP_BY_CITY)) {
          if (error.status == 404) {
            this.snackBar.open(config.ERROR_CITY_NOT_FOUND_OPENW, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
          }
          else if (error.status != 200) {
            this.snackBar.open(config.ERROR_OPENWEATHERMAP, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
          }
        }
        else if (request.url.includes(config.API_OPENWEATHERMAP)) {
          if (error.status != 200 && request.method == "GET") {
            this.snackBar.open(config.ERROR_OPENWEATHERMAP, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
          }
        }

        else if (request.url.includes(config.URL_BEACHES)) {
          if (error.status != 200 && request.method == "GET") {
            this.snackBar.open(config.ERROR_GET_BEACHES, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
          }
          else if (error.status != 200 && request.method == "DELETE") {
            this.snackBar.open(config.ERROR_DELETE_BEACH, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
          }
        }

        else
          this.snackBar.open(config.ERROR_GENERIC + error.url, 'close', {duration: this.errorTime, panelClass: 'errorSnack'});
        return throwError(error);
      })
    );
  }
}
