'use client';
import { LocalStorageKey, LocalStorageService } from '@/app/services/localStorageService';
import { isCityInFavorites } from '@/functions/isCityInFavorites';
import { WeatherData } from '@/models/weatherData';
import { createContext, useContext, useEffect, useState } from 'react';

interface Context {
    favorites: WeatherData[];
    handleFavorite: (newFavorite: WeatherData) => void;
    loading: boolean;
    handleLoading: (isLoading: boolean) => void;
}

const AppContext = createContext<Context | undefined>(undefined);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const localStorage = new LocalStorageService();
    const [loading, setLoading] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<WeatherData[]>(localStorage.getItem(LocalStorageKey.FAVORITES) ?? []);

    const handleLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    const handleFavorite = (newFavorite: WeatherData) => {
        const isCityInFavs = isCityInFavorites(newFavorite, favorites);
        if (!isCityInFavs) {
            setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        } else {
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== newFavorite.id));
        }
    };

    useEffect(() => {
        localStorage.setItem(LocalStorageKey.FAVORITES, favorites);
    }, [favorites]);

    return <AppContext.Provider value={{ favorites, handleFavorite, loading, handleLoading }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('Error en el contexto');
    return context;
};
