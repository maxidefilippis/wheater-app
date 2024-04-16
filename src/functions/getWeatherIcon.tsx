import { ClearIcon } from '@/components/icons/clear';
import { CloudsIcon } from '@/components/icons/clouds';
import { SunnyIcon } from '@/components/icons/sunny';
import { Wheater } from '@/constants/wheater';

export const getWeatherIcon = (wheater: string) => {
    switch (wheater) {
        case Wheater.CLOUD:
            return <CloudsIcon />;
        case Wheater.CLEAR:
            return <ClearIcon />;
        default:
            return <SunnyIcon />;
    }
};
