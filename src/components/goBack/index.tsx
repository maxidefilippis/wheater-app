import Link from 'next/link';
import { Typography } from '../typografhy';
import styles from './index.module.css';
import { FullContainer } from '../container';
import { TextType } from '@/constants/textType';

interface BackComponentProps {
    message?: string;
}
export const BackComponent = ({ message }: BackComponentProps) => {
    if (message) return <GoBackPage message={message} />;

    return <BackButton />;
};

export const BackButton = () => {
    return (
        <div className={styles.back}>
            <Link href={'/'}>
                <Typography text="Volver" />
            </Link>
        </div>
    );
};

const GoBackPage = ({ message }: { message: string }) => {
    return (
        <FullContainer>
            <Typography text={message} type={TextType.SUBTITLE} />
            <BackButton />
        </FullContainer>
    );
};
