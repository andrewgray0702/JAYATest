import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather(search) {
    console.log("weather service")
    console.log(search);
    return this.http.post('http://localhost:3000/api/location/city', search)
  }
}
