import { getWeatherIcon } from '@/functions/getWeatherIcon';
import { isCityInFavorites } from '@/functions/isCityInFavorites';
import { WeatherData } from '@/models/weatherData';
import Link from 'next/link';
import { DataProp } from '../dataProp';
import { Favorite } from '../icons/favorite';
import { FavoriteFilled } from '../icons/favoriteFilled';
import styles from './index.module.css';

interface CityCardProps {
    city: WeatherData;
    favorites: WeatherData[];
    handleFavorite: any;
}
export const CityCard = ({ city, favorites, handleFavorite }: CityCardProps) => {
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
            <DataProp label="Clima" value={String(city.main.temp)} />
            <DataProp label="Humedad" value={String(city.main.humidity)} />
            <DataProp label="Presión" value={String(city.main.pressure)} />
            <DataProp label="Temperatura Máxima" value={String(city.main.temp_max)} />
            <DataProp label="Sensación Térmica" value={String(city.main.feels_like)} />
        </div>
    );
};
