import { useAppContext } from '@/context';
import { getWeatherIcon } from '@/functions/getWeatherIcon';
import { isCityInFavorites } from '@/functions/isCityInFavorites';
import { convertKelvinToCelsius } from '@/functions/showCelsius';
import { WeatherData } from '@/models/weatherData';
import Link from 'next/link';
import { DataProp } from '../dataProp';
import { Favorite } from '../icons/favorite';
import { FavoriteFilled } from '../icons/favoriteFilled';
import styles from './index.module.css';

interface CityCardProps {
    city: WeatherData;
}
export const CityCard = ({ city }: CityCardProps) => {
    const { favorites, handleFavorite } = useAppContext();

    if (!city.id) return;
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={() => handleFavorite(city)}>
                {isCityInFavorites(city, favorites) ? <FavoriteFilled /> : <Favorite />}
            </div>
            <div className={styles.row}>
                <Link href={`/forecast/${city.name}`}>
                    <h2>{city.name}</h2>
                </Link>
                {getWeatherIcon(city.weather[0].main)}
            </div>
            <DataProp label="Temperatura" value={`${String(convertKelvinToCelsius(city.main.temp))}°`} />
            <DataProp label="Sensación Térmica" value={`${String(convertKelvinToCelsius(city.main.feels_like))}°`} />
            <DataProp label="Humedad" value={`${String(city.main.humidity)}%`} />
            <DataProp label="Presión" value={`${String(city.main.pressure)} hPa`} />
        </div>
    );
};
