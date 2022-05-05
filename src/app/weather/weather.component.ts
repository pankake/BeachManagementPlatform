import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpHandler} from "@angular/common/http";
import config from "src/assets/config";
import {WebService} from "../services/web.service";
import {Observable, throwError} from 'rxjs';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import {AlertService} from "../services/alert.service";
import { FormGroup, FormControl } from '@angular/forms';
import {catchError} from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {

  position: any;
  OpenweathermapData: any;
  WeatherbitData: any;
  faCloudShowersHeavy: any = faCloudShowersHeavy;
  formdata: any;
  city: any;

  constructor(private http: HttpClient, private handler: HttpHandler, private webService: WebService,
              private alertService: AlertService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.formdata = new FormGroup({
      city: new FormControl()
    });

    this.WeatherbitData = {};
    this.OpenweathermapData = {};

    this.getPosition().subscribe(pos => {
      this.position = pos;
    }), catchError((error) => {
      return throwError(() => error);
    });
  }

  getPosition(): Observable<any> {

    let options: {
      maximumAge:10000, timeout:5000, enableHighAccuracy: true
    }

    return new Observable (observer => {

      navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();

        this.callWeatherbit().subscribe(data => {
          this.setWeatherbitData(data);
          this.sendUVData(this.WeatherbitData.city_name, this.WeatherbitData.uv)
        });

        this.callOpenweathermap().subscribe(data => {
          this.setOpenweathermapData(data);
          this.sendWindData(this.OpenweathermapData.name, this.OpenweathermapData.wind_spd);
        });
      },
        error => {
          this.snackBar.open(config.ERROR_GEOLOCATIONPOSITION, 'close', { duration: 2000, panelClass: 'errorSnack' });
          observer.error(error);
        }
        , options);
    });
  }

  callWeatherbit(): Observable<any> {

    return new Observable (observer => {
      this.http.get(config.API_WEATHERBIT + 'lat=' + this.position.coords.latitude +'&lon='
        + this.position.coords.longitude+ '&key=' + config.WEATHERBIT_API_KEY)
        .subscribe(value => {
          observer.next(value);
          observer.complete();
        },
          error => observer.error(error));
    });
  }

  callOpenweathermap(): Observable<any> {

    return new Observable (observer => {
      this.http.get(config.API_OPENWEATHERMAP + 'lat=' + this.position.coords.latitude +'&lon='
      + this.position.coords.longitude+ '&appid=' + config.OPENWEATHERMAP_KEY)
        .subscribe(value => {
            observer.next(value);
            observer.complete();
          },
          error => observer.error(error));
    });
  }

  setOpenweathermapData(data: any) {

    const kelvin_temp = 273.15;
    let resOpenweathermapData = data;

    this.OpenweathermapData.temp_celcius = (resOpenweathermapData.main.temp - kelvin_temp).toFixed(0);
    this.OpenweathermapData.temp_min = (resOpenweathermapData.main.temp_min - kelvin_temp).toFixed(0);
    this.OpenweathermapData.temp_max = (resOpenweathermapData.main.temp_max - kelvin_temp).toFixed(0);
    this.OpenweathermapData.temp_feels_like = (resOpenweathermapData.main.feels_like - kelvin_temp).toFixed(0);

    this.OpenweathermapData.name =  resOpenweathermapData.name;
    this.OpenweathermapData.humidity =  resOpenweathermapData.main.humidity;
    this.OpenweathermapData.wind_spd =  resOpenweathermapData.wind.speed;
  }

  setWeatherbitData(data: any) {

    let resWeatherbit = data.data[0];

    this.WeatherbitData.pod = resWeatherbit.pod;
    this.WeatherbitData.clouds = resWeatherbit.clouds;
    this.WeatherbitData.umidity =  resWeatherbit.rh;
    this.WeatherbitData.uv =  Math.round(resWeatherbit.uv);

    this.WeatherbitData.description =  resWeatherbit.weather.description;
    this.WeatherbitData.precipitation =Number.parseFloat(resWeatherbit.precip).toFixed(2);

    this.WeatherbitData.city_name = resWeatherbit.city_name;
  }

  sendWindData(city: any, wind: any) {
    this.alertService.sendWind(city, wind);
  }

  sendUVData(city: any, uv: any) {
    this.alertService.sendUV(city, uv);
  }

  onClickSubmit(data: any) {
    this.city = data.city;
    console.log("City: " +  this.city);

    this.callWeatherbitWithCity(this.city).subscribe(data => {
      this.setWeatherbitData(data);
      this.sendUVData(this.WeatherbitData.city_name, this.WeatherbitData.uv)
    });

    this.callOpenweathermapWithCity(this.city).subscribe(data => {
      this.setOpenweathermapData(data);
      this.sendWindData(this.OpenweathermapData.name, this.OpenweathermapData.wind_spd);
    });
  }

  callWeatherbitWithCity(city: any): Observable<any> {

    return new Observable (observer => {
      this.http.get(config.API_WEATHERBIT + 'city=' + city + '&key=' + config.WEATHERBIT_API_KEY)
        .subscribe(value => {
            observer.next(value);
            observer.complete();
          },
          error => observer.error(error));
    });
  }

  callOpenweathermapWithCity(city: any): Observable<any> {

    return new Observable (observer => {
      this.http.get(config.API_OPENWEATHERMAP + 'q=' + city + '&appid=' + config.OPENWEATHERMAP_KEY)
        .subscribe(value => {
            observer.next(value);
            observer.complete();
          },
          error => observer.error(error));
    });
  }
}
