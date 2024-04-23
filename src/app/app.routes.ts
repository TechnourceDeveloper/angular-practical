import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'weather/:location', component: WeatherComponent },
    { path: '**', redirectTo: '' } // Redirect any other route to home
];
