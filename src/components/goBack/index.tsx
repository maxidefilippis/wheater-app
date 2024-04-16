import Link from 'next/link';
import { Typography } from '../typografhy';
import styles from './index.module.css';

export const GoBack = () => {
    return (
        <div className={styles.back}>
            <Link href={'/'}>
                <Typography text="Volver" />
            </Link>
        </div>
    );
};
