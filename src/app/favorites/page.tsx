'use client';
import { CityCard } from '@/components/cityCard';
import { useAppContext } from '@/context';
import styles from './page.module.css';
import Link from 'next/link';

export default function Favorites() {
    const { favorites, handleFavorite } = useAppContext();

    return (
        <div className={styles.favorites}>
            <p>Mis ciudades Favoritas:</p>
            <div className={styles.favContainer}>
                {favorites.map((city) => (
                    <CityCard key={city.id} city={city} favorites={favorites} handleFavorite={handleFavorite} />
                ))}
            </div>
            <Link href={'/'}>
                <p>Volver</p>
            </Link>
        </div>
    );
}
