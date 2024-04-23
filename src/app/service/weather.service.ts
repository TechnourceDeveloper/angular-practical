import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Period } from '../interface/period';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {

  }
  getForecast(location: string) {
    const apiUrl = `https://api.weather.gov/gridpoints/${location}/31,80/forecast`;
    return this.http.get(apiUrl);
  }
  extractTemperatureData(forecastData: any): { items: Period[], name: string[], temperatures: number[] } {
    const items: Period[] = [];
    const name: string[] = [];
    const temperatures: number[] = [];

    forecastData.properties.periods.forEach((period: Period) => {
      items.push(period);
      name.push(period.name);
      temperatures.push(period.temperature);
    });

    return { items, name, temperatures };
  }
}
