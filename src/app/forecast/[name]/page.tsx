'use client';
import { CityExtendedCard } from '@/components/cityExtendedCard';
import { useAppContext } from '@/context';
import { WeatherForecast } from '@/models/weatherForecast';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Forecast({ params }: { params: { name: string } }) {
    const { loading, handleLoading } = useAppContext();
    const [forecast, setForecast] = useState<WeatherForecast>({} as WeatherForecast);

    const handleForecast = () => {
        handleLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params?.name}&appid=5ecdde6fa83217acb2e8c3705318cf2e&lang=ES`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => setForecast(data))
            .catch((error) => console.log({ error }))
            .finally(() => handleLoading(false));
    };

    useEffect(() => {
        handleForecast();
    }, [params.name]);

    if (!forecast || loading) return 'Cargando...';
    return (
        <div className={styles.forecast}>
            <p>Detalle extendido:</p>
            <div>
                <CityExtendedCard city={forecast} />
            </div>
            <Link href={'/'}>
                <p>Volver</p>
            </Link>
        </div>
    );
}
