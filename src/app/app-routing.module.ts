import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {BeachComponent} from "./beach/beach.component";
import {WeatherComponent} from "./weather/weather.component";

const routes: Routes = [{path: '', component: WeatherComponent},
  {path: '', redirectTo: 'WeatherComponent', pathMatch: 'full'},

  {path: 'weather', component: WeatherComponent},
  {path: 'beach', component: BeachComponent}];



@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule { }
