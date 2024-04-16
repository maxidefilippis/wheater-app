'use client';
import { CityExtendedCard } from '@/components/cityExtendedCard';
import { FullContainer } from '@/components/container';
import { GoBack } from '@/components/goBack';
import { Skeleton } from '@/components/skeleton';
import { Typography } from '@/components/typografhy';
import { apiKey, apiUrl } from '@/constants/globals';
import { TextType } from '@/constants/textType';
import { useAppContext } from '@/context';
import { WeatherForecast } from '@/models/weatherForecast';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Forecast({ params }: { params: { name: string } }) {
    const { loading, handleLoading } = useAppContext();
    const [forecast, setForecast] = useState<WeatherForecast>({} as WeatherForecast);

    useEffect(() => {
        handleLoading(true);
        fetch(`${apiUrl}/forecast?q=${params?.name}&appid=${apiKey}&lang=ES`)
            .then((res) => res.json())
            .then((data) => setForecast(data))
            .catch((error) => console.log({ error }))
            .finally(() => handleLoading(false));
    }, [params.name]);

    if (!forecast?.city) {
        return (
            <FullContainer>
                {loading && <Skeleton rows={16} />}
                {!loading && (
                    <>
                        <Typography text={`No existe ciudad con ese nombre`} type={TextType.SUBTITLE} />
                        <GoBack />
                    </>
                )}
            </FullContainer>
        );
    }
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
