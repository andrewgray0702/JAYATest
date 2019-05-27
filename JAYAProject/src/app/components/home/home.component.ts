/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Chart } from 'chart.js';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  minuteTime;
  dailyTime;
  hourlyTime;
  dailyDate = [];
  minuteDate = [];
  hourDate = [];
  minuteChart = [];
  hourChart = [];
  dailyChart = [];
  minutePrecipIntensity = [];
  precipIntensity;
  precipProbability;
  minutePrecipProbability = [];
  appTemp;
  temp;
  tempHigh;
  tempLow;
  hourAppTemp = [];
  hourTemp = [];
  hourPrecipProb = [];
  dailyTempHigh = [];
  dailyTempLow = [];
  dailyPrecipProb = [];
  lat: number;
  loading: boolean;
  lng: number;
  zoom: number = 15;
  error: string;
  location: string;
  displayMinutely: boolean = false;
  displayHourly: boolean = false;
  displayDaily: boolean = true;
  constructor(private weatherService: WeatherService) { }
  clickMinutely(){
    this.displayHourly = false;
    this.displayDaily = false;
    this.getWeather();
    this.displayMinutely = true;
  }
  clickHourly(){
    this.displayDaily = false;
    this.displayMinutely = false;
    this.getWeather();
    this.displayHourly = true;
  }
  clickDaily(){
    this.displayHourly = false;
    this.displayMinutely = false;
    this.getWeather();
    this.displayDaily = true;
  }

  getWeather() {  // makes api call
    //console.log(this.search);
    this.loading = true;
    this.weatherService.getWeather({
      "search": this.search
    }).subscribe(res => {
      if(res['error']){
        this.error = res['error'];
      }
      this.location = res['location'];
      this.lat = parseFloat(res['latitude']);
      this.lng = parseFloat(res['longitude']);  

      //console.log(this.lat, this.lng);
      this.daily = res['daily'].data;
      // console.log(this.daily);
      this.hourly = res['hourly'].data;
      // console.log(this.hourly);
      // this.minutely = res['minutely'].data;
      this.minutely = res['minutely'].data;
      // console.log(this.minutely);
      this.minutely.map(res => {
        this.precipIntensity = res['precipIntensity'];
        this.precipProbability = res['precipProbability'];
        this.minutePrecipIntensity.push(this.precipIntensity);
        this.minutePrecipProbability.push(this.precipProbability);
      })
      this.minutely.map(res => {
        this.minuteTime = new Date(res['time'] * 1000);
        this.minuteTime = this.minuteTime.toLocaleTimeString();
        this.minuteDate.push(this.minuteTime)
      });
      this.minuteChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.minuteDate,
          datasets: [
            { 
              label: 'Precipitation Intensity',
              data: this.minutePrecipIntensity,
              borderColor: "#3cba9f",
              fill: false
            },
            { 
              label: 'Precipitation Probability (Percent)',
              data: this.minutePrecipProbability,
              borderColor: "#2DE327",
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.daily.map(res => {
        this.dailyTime = new Date(res['time'] * 1000);
        this.dailyTime = this.dailyTime.toLocaleDateString();
        this.dailyDate.push(this.dailyTime);
      });
      this.daily.map(res => {
        this.tempHigh = res['temperatureHigh'];
        this.tempLow = res['temperatureLow'];
        this.precipProbability = Math.floor(res['precipProbability'] * 100);
        this.dailyTempHigh.push(this.tempHigh);
        this.dailyTempLow.push(this.tempLow);
        this.dailyPrecipProb.push(this.precipProbability);
      })
      this.hourChart = new Chart('canvas3', {
        type: 'line',
        data: {
          labels: this.dailyDate,
          datasets: [
            { 
              label: 'Apparent Temperature', 
              data: this.dailyTempHigh,
              borderColor: "#3cba9f",
              fill: false
            },
            { 
              label: 'Precipitation Probability (Percent)',
              data: this.dailyPrecipProb,
              borderColor: "#2DE327",
              fill: false
            },
            {
              label: 'Temperature',
              data: this.dailyTempLow,
              borderColor: '#191973'
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.hourly.map(res => {
        this.appTemp = res['apparentTemperature'];
        this.temp = res['temperature'];
        this.precipProbability = Math.floor(res['precipProbability'] * 100);
        this.hourAppTemp.push(this.appTemp);
        this.hourTemp.push(this.temp);
        this.hourPrecipProb.push(this.precipProbability);
      })
      this.hourly.map(res => {
        this.hourlyTime = new Date(res['time'] * 1000);
        this.hourlyTime = this.hourlyTime.toLocaleString();
        this.hourDate.push(this.hourlyTime);
      });
      this.hourChart = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: this.hourDate,
          datasets: [
            { 
              label: 'Apparent Temperature',
              data: this.hourAppTemp,
              borderColor: "#3cba9f",
              fill: false
            },
            { 
              label: 'Precipitation Probability (Percent)',
              data: this.hourPrecipProb,
              borderColor: "#2DE327",
              fill: false
            },
            {
              label: 'Temperature',
              data: this.hourTemp,
              borderColor: '#191973'
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.loading = false;
  
      

    })
  }

  ngOnInit() {
    
  }

}
