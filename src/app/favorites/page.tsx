'use client';
import { CityCard } from '@/components/cityCard';
import { BackButton, BackComponent } from '@/components/goBack';
import { Typography } from '@/components/typografhy';
import { TextType } from '@/constants/textType';
import { useAppContext } from '@/context';
import styles from './page.module.css';

export default function Favorites() {
    const { favorites } = useAppContext();

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
