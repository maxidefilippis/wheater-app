import { WeatherData } from '@/models/weatherData';

export const searchCityInFavorites = (city: WeatherData, favorites: WeatherData[]) => {
    return favorites.findIndex((favCity) => favCity.id === city.id);
};
