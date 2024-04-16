'use client';
import { CityCard } from '@/components/cityCard';
import { Typography } from '@/components/typografhy';
import { TextType } from '@/constants/textType';
import { useAppContext } from '@/context';
import Link from 'next/link';
import styles from './page.module.css';

export default function Favorites() {
    const { favorites, handleFavorite } = useAppContext();

    return (
        <div className={styles.favorites}>
            <div className={styles.favoritesHead}>
                <Typography text="Mis ciudades favoritas" type={TextType.TITLE} />
            </div>
            <div className={styles.cardsContainer}>
                {favorites.map((city) => (
                    <CityCard key={city.id} city={city} favorites={favorites} handleFavorite={handleFavorite} />
                ))}
            </div>
            <div className={styles.back}>
                <Link href={'/'}>
                    <Typography text="Volver" />
                </Link>
            </div>
        </div>
    );
}
