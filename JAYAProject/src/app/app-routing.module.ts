import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetWeatherComponent } from './components/get-weather/get-weather.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'weather', component: GetWeatherComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
