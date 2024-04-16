'use client';
import { isCityInFavorites } from '@/functions/isCityInFavorites';
import { WeatherData } from '@/models/weatherData';
import { createContext, useContext, useState } from 'react';

interface Context {
    favorites: WeatherData[];
    handleFavorite: (newFavorite: WeatherData) => void;
}

const AppContext = createContext<Context | undefined>(undefined);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<WeatherData[]>([]);

    const handleFavorite = (newFavorite: WeatherData) => {
        const isCityInFavs = isCityInFavorites(newFavorite, favorites);
        if (!isCityInFavs) {
            setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        } else {
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== newFavorite.id));
        }
    };

    return <AppContext.Provider value={{ favorites, handleFavorite }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('Error with context');
    return context;
};
