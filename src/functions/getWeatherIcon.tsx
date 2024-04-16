import { Wheater } from '@/constants/wheater';
import { CloudsIcon } from '@/components/icons/clouds';
import { ClearIcon } from '@/components/icons/clear';

export const getWeatherIcon = (wheater: string) => {
    switch (wheater) {
        case Wheater.CLOUD:
            return <CloudsIcon />;
        case Wheater.CLEAR:
            return <ClearIcon />;
    }
};
