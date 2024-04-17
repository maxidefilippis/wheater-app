'use client';
import { useFetch } from '@/app/hooks/useFetch';
import { CityExtendedCard } from '@/components/cityExtendedCard';
import { BackButton, BackComponent } from '@/components/goBack';
import { Skeleton } from '@/components/skeleton';
import { Typography } from '@/components/typografhy';
import { ApiCodes } from '@/constants/apiCodes';
import { apiKey, apiUrl } from '@/constants/globals';
import { TextType } from '@/constants/textType';
import { WeatherForecast } from '@/models/weatherForecast';
import styles from './page.module.css';

export default function Forecast({ params }: { params: { name: string } }) {
    const { data, error, isLoading } = useFetch<WeatherForecast>(`${apiUrl}/forecast?q=${params?.name}&appid=${apiKey}&lang=ES`, true);

    if (isLoading) return <Skeleton rows={16} />;
    if (data?.cod != ApiCodes.OK || error) return <BackComponent message={`No existe ciudad con ese nombre`} />;
    return (
        <div className={styles.forecast}>
            <div className={styles.forecastHead}>
                <Typography text={`Detalle extendido de la ciudad`} type={TextType.TITLE} />
            </div>
            <div className={styles.card}>
                <CityExtendedCard city={data} />
            </div>
            <BackButton />
        </div>
    );
}
