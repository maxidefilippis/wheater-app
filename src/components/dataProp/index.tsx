import styles from './index.module.css';

export const DataProp = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className={styles.property}>
            <label>{label}</label>
            <p>{value}</p>
        </div>
    );
};
