export interface WeatherData {
    base: string;
    clouds: Clouds;
    cod: number | string;
    coord: Coord;
    dt: number;
    id: number;
    main: Main;
    name: string;
    sys: Sys;
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: Wind;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds {
    all: number;
}
