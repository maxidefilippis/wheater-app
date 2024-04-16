'use client';
import { CityExtendedCard } from '@/components/cityExtendedCard';
import { GoBack } from '@/components/goBack';
import { Typography } from '@/components/typografhy';
import { TextType } from '@/constants/textType';
import { useAppContext } from '@/context';
import { WeatherForecast } from '@/models/weatherForecast';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Skeleton } from '@/components/skeleton';
import { FullContainer } from '@/components/container';

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

    if (!forecast?.city && loading) return <FullContainer children={<Skeleton rows={16} />} />;
    if (!forecast?.city && !loading)
        return (
            <FullContainer>
                <Typography text={`No existe ciudad con ese nombre`} type={TextType.SUBTITLE} />
                <GoBack />
            </FullContainer>
        );
    return (
        <div className={styles.forecast}>
            <div className={styles.forecastHead}>
                <Typography text={`Detalle extendido de la ciudad`} type={TextType.TITLE} />
            </div>
            <div className={styles.card}>
                <CityExtendedCard city={forecast} />
            </div>
            <GoBack />
        </div>
    );
}
