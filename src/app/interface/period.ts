export interface Period {
    name: string;
    startTime : Date;
    endTime : Date
    temperature: number;
    shortForecast: string;
    detailedForecast: string;
    windSpeed: string;
    windDirection: string;
    temperatureUnit: string;
    icon : string
}
