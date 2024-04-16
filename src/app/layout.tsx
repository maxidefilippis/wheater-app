'use client';
import { AppWrapper } from '@/context';
import { Inter } from 'next/font/google';
import styles from './layout.module.css';
import { Typography } from '@/components/typografhy';
import { TextType } from '@/constants/textType';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppWrapper>
                    <header className={styles.header}>
                        <Typography type={TextType.MAIN_TITLE} text={'Weather App'} />
                    </header>
                    <main className={styles.main}>{children}</main>
                    <footer className={styles.footer}>
                        <Typography type={TextType.TEXT} text={'Weather App @ Desarrollada por Maxi De Filippis'} />
                    </footer>
                </AppWrapper>
            </body>
        </html>
    );
}
