import { WeatherData } from '@/models/weatherData';

export const isCityInFavorites = (city: WeatherData, favorites: WeatherData[]) => {
    return favorites?.some((favorite) => favorite.id === city.id);
};
