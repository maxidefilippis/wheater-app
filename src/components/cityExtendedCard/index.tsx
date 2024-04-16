import { convertKelvinToCelsius } from '@/functions/showCelsius';
import { WeatherForecast } from '@/models/weatherForecast';
import { useMemo } from 'react';
import { DataProp } from '../dataProp';
import { ChartGraph } from '../graph';
import { Typography } from '../typografhy';
import styles from './index.module.css';

interface CityExtendedCardProps {
    city: WeatherForecast;
}
export const CityExtendedCard = ({ city }: CityExtendedCardProps) => {
    const yAxis = useMemo(() => city?.list.map((value) => Number(convertKelvinToCelsius(value.main.temp))), [city]);
    const xAxis = useMemo(() => city?.list.map((value) => value.dt_txt), [city]);

    if (city.cod !== '200') return;
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <h2>{city.city.name}</h2>
            </div>
            <div className={styles.props}>
                <DataProp label="País" value={String(city.city.country)} />
                <DataProp label="Población" value={String(city.city?.population)} />
            </div>
            <div className={styles.temp}>
                <Typography text={`Temperatura para los próximos días`} />
            </div>
            <ChartGraph xAxis={xAxis} yAxis={yAxis} />
        </div>
    );
};
