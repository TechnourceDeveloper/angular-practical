# Weather Forecast Visualisation - Angular App

This Angular app fetches weather forecast data from an API and visualizes it using Chart.js. It displays a line chart representing the temperature forecast for selected locations.

## Requirements

- Node.js and npm installed on your machine
- Angular CLI installed globally (`npm install -g @angular/cli`)

## Setup

1. Clone this repository to your local machine:
git clone https://github.com/TechnourceDeveloper/weather-forecast-visualisation-angular-app.git

2. Navigate to the project directory:

3. Install all packages using `npm  install` command

## Usage

1. Start the Angular development server using `ng serve`

2. Open your browser and navigate to `http://localhost:4200/` to view the app.

3. On the home screen, you will see a list of weather forecasting options. Click on any option to view the corresponding weather forecast chart.

## API Endpoints

- **District of Columbia Forecast (LWX)**: `https://api.weather.gov/gridpoints/LWX/31,80/forecast`
- **Kansas Forecast (TOP)**: `https://api.weather.gov/gridpoints/TOP/31,80/forecast`

## Technologies Used

- Angular
- Chart.js
- TypeScript
- HTML/CSS