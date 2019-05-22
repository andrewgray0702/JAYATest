import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: String = "";
  constructor(private weatherService: WeatherService) { }
  getWeather(search){
    console.log("component")
    this.weatherService.getWeather({
      "search": search
    })
  }
  ngOnInit() {
  }

}
