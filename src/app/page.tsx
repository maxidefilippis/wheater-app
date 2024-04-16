'use client';
import { CityCard } from '@/components/cityCard';
import { ApiCodes } from '@/constants/apiCodes';
import { useAppContext } from '@/context';
import { WeatherData } from '@/models/weatherData';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
    const { favorites, loading, handleLoading, handleFavorite } = useAppContext();
    const [search, setSearch] = useState<string>('');
    const [state, setState] = useState<WeatherData>({} as WeatherData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        handleLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5ecdde6fa83217acb2e8c3705318cf2e&lang=ES`)
            .then((res) => res.json())
            .then((data) => setState(data))
            .catch((error) => console.log({ error }))
            .finally(() => handleLoading(false));
    };

    return (
        <div className={styles.home}>
            <h1>Weather App</h1>
            <Link href={'/favorites'}>Favoritos ({favorites.length})</Link>
            <input type="text" value={search} onChange={handleInputChange} />
            <button onClick={handleSearch}>search</button>
            {loading && <div>Loading...</div>}
            {state?.cod === ApiCodes.OK && <CityCard city={state} favorites={favorites} handleFavorite={handleFavorite} />}
            {state?.cod === ApiCodes.NOT_FOUND && <div>Su búsqueda no encontró resultados</div>}
        </div>
    );
}
