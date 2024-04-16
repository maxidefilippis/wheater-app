import { WeatherForecast } from '@/models/weatherForecast';
import { DataProp } from '../dataProp';
import { ChartGraph } from '../graph';
import styles from './index.module.css';
import { useMemo } from 'react';

interface CityExtendedCardProps {
    city: WeatherForecast;
}
export const CityExtendedCard = ({ city }: CityExtendedCardProps) => {
    if (city.cod !== '200') return;

    const yAxis = useMemo(() => city.list.map((value) => value.main.temp), [city]);
    const xAxis = useMemo(() => city.list.map((value) => value.dt_txt), [city]);

    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <h2>{city.city.name}</h2>
            </div>
            <DataProp label="País" value={String(city.city.country)} />
            <DataProp label="Población" value={String(city.city?.population)} />
            <div>
                <ChartGraph xAxis={xAxis} yAxis={yAxis} />
            </div>
        </div>
    );
};
