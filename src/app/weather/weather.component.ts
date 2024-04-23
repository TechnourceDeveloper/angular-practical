import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { WeatherService } from '../service/weather.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, RouterLink],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  // get location param from route
  location: string = '';
  // store periods data
  weatherData: any[] = [];
  // Store name and temperature in array for display in chart
  forecastName: string[] = [];
  forecastTemperatures: number[] = [];

  // chart initialize
  chart: any;

  isLWX: boolean = false;
  isTOP: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
  ) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.location = params['location'];
      this.isLWX = this.location === 'LWX';
      this.isTOP = this.location === 'TOP';
      this.fetchForecast();
    });
  }

  fetchForecast() {
    try {
      // call weather service and get data from api.
      this.weatherService.getForecast(this.location).subscribe((data: any) => {
        // extract data
        const { items, name, temperatures } = this.weatherService.extractTemperatureData(data);
        this.weatherData = items;
        this.forecastName = name;
        this.forecastTemperatures = temperatures;
        this.drawChart();
      });
    } catch (error) {
      console.log(error);
    }
  }
  // draw chart
  drawChart() {
    try {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.forecastName,
          datasets: [
            {
              label: 'Temperature (°F)',
              data: this.forecastTemperatures,
              borderWidth: 2,
              borderColor: 'rgb(0, 66, 170)',
              tension: 0.4,
              pointStyle: 'circle',
              pointRadius: 7,
              pointHoverRadius: 12
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Week Days'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temperature (°F)'
              }
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItem: any) => {
                  const dataIndex = tooltipItem[0].dataIndex;
                  return this.forecastName[dataIndex];
                },
                label: (tooltipItem: any) => {
                  var datePipe = new DatePipe("en-US");
                  const dataIndex = tooltipItem.dataIndex;
                  const weatherInfo = this.weatherData[dataIndex];
                  return [
                    `Temperature: ${weatherInfo.temperature}(°${weatherInfo.temperatureUnit})`,
                    `Start Time: ${datePipe.transform(weatherInfo.startTime, 'yyyy-MM-dd HH:mm:ss')}`,
                    `End Time: ${datePipe.transform(weatherInfo.endTime, 'yyyy-MM-dd HH:mm:ss')}`,
                    `WindSpeed: ${weatherInfo.windSpeed}`,
                    `WindDirection: ${weatherInfo.windDirection}`,
                    `Short Forecast: ${weatherInfo.shortForecast}`,
                  ];
                }
              }
            }
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
