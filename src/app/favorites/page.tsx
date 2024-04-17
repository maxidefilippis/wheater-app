'use client';
import { CityCard } from '@/components/cityCard';
import { BackButton, BackComponent } from '@/components/goBack';
import { Skeleton } from '@/components/skeleton';
import { Typography } from '@/components/typografhy';
import { TextType } from '@/constants/textType';
import { useAppContext } from '@/context';
import styles from './page.module.css';

export default function Favorites() {
    const { favorites, storageLoading } = useAppContext();

    if (storageLoading) return <Skeleton rows={16} />;
    if (!favorites.length) return <BackComponent message="Aun no tiene ciudades en favoritos" />;
    return (
        <div className={styles.favorites}>
            <div className={styles.favoritesHead}>
                <Typography text="Mis ciudades favoritas" type={TextType.TITLE} />
            </div>
            <div className={styles.cardsContainer}>
                {favorites.map((city) => <CityCard key={city.id} city={city} />)}
            </div>
            <BackButton />
        </div>
    );
}
