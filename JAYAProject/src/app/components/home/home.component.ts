import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = '';
  daily: Object[];
  hourly: Object[];
  minutely: Object[];
  constructor(private weatherService: WeatherService) { }
  getWeather(){
    //console.log(this.search);
    this.weatherService.getWeather({
      "search": this.search
    }).subscribe(res => {
      this.daily = res['daily'].data;
      // console.log(this.daily);
      this.hourly = res['hourly'].data;
      // console.log(this.hourly);
      this.minutely = res['minutely'].data;
      console.log(this.minutely);
    })
  } 
  ngOnInit() {
  }

}
