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
import styles from './page.module.css';

export default function Home() {
    const { favorites, loading, handleLoading } = useAppContext();
    const [search, setSearch] = useState<string>('');
    const [state, setState] = useState<WeatherData>({} as WeatherData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        handleLoading(true);
        fetch(`${apiUrl}/weather?q=${search}&appid=${apiKey}&lang=ES`)
            .then((res) => res.json())
            .then((data) => setState(data))
            .catch((error) => console.log({ error }))
            .finally(() => {
                setSearch('');
                handleLoading(false);
            });
    };

    return (
        <div className={styles.home}>
            <div className={styles.homeHead}>
                <Typography text="Ingrese el nombre de una ciudad" />
                <Link href={'/favorites'}>Favoritos ({favorites?.length})</Link>
            </div>
            <div className={styles.searchBox}>
                <InputText value={search} onChange={handleInputChange} />
                <Button onClick={handleSearch} disabled={!search}>
                    Buscar
                </Button>
            </div>
            <div className={styles.errorsContainer}>
                {loading && <Typography text="Buscando..." />}
                {!loading && state?.cod === ApiCodes.NOT_FOUND && <Typography text="Su búsqueda no encontró resultados..." />}
            </div>
            <div className={styles.results}>{state?.cod === ApiCodes.OK && <CityCard city={state} />}</div>
        </div>
    );
}
