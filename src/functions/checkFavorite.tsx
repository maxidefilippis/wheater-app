import { WeatherData } from '@/models/weatherData';

export const checkFavorite = (city: WeatherData, favorites: WeatherData[]) => {
    return favorites?.some((favCity) => favCity.id === city.id);
};
