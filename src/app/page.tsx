'use client';
import { Button } from '@/components/button';
import { CityCard } from '@/components/cityCard';
import { InputText } from '@/components/input';
import { Typography } from '@/components/typografhy';
import { ApiCodes } from '@/constants/apiCodes';
import { apiKey, apiUrl } from '@/constants/globals';
import { useAppContext } from '@/context';
import { WeatherData } from '@/models/weatherData';
import Link from 'next/link';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import styles from './page.module.css';

export default function Home() {
    const { favorites } = useAppContext();
    const [search, setSearch] = useState<string>('');
    const [url, setURL] = useState('');
    const { data, error, isLoading } = useFetch<WeatherData>(url, false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    const handleSearch = () => {
        setURL(`${apiUrl}/weather?q=${search}&appid=${apiKey}&lang=ES`);
    };

    return (
        <div className={styles.home}>
            <div className={styles.homeHead}>
                <Typography text="Ingrese el nombre de una ciudad" />
                <Link href={'/favorites'}>Favoritos {`(${favorites?.length})`}</Link>
            </div>
            <div className={styles.searchBox}>
                <InputText value={search} onChange={handleInputChange} />
                <Button onClick={handleSearch} disabled={!search}>
                    Buscar
                </Button>
            </div>
            <div className={styles.errorsContainer}>
                {isLoading && <Typography text="Buscando..." />}
                {!isLoading && (data?.cod === ApiCodes.NOT_FOUND || error) && <Typography text="Su búsqueda no encontró resultados..." />}
            </div>
            <div className={styles.results}>{data?.cod === ApiCodes.OK && <CityCard city={data} />}</div>
        </div>
    );
}
