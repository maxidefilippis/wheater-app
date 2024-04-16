import { Clouds, Coord, Main, Sys, Weather, Wind } from './weatherData';

export interface WeatherForecast {
    city: City;
    cnt: number;
    cod: number | string;
    list: ListItem[];
    message: number;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population?: number;
}

export interface ListItem {
    clouds: Clouds;
    dt: number;
    dt_txt: string;
    main: Main;
    pop: number;
    sys: Sys;
    visibility: number;
    weather: Weather[];
    wind: Wind;
}
