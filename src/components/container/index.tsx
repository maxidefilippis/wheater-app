import { ReactNode } from 'react';
import styles from './index.module.css';

export const FullContainer = ({ children }: { children: ReactNode }) => {
    return <div className={styles.full}>{children}</div>;
};
