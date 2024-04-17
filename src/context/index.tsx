'use client';
import { LocalStorageKey, LocalStorageService } from '@/app/services/localStorageService';
import { isCityInFavorites } from '@/functions/isCityInFavorites';
import { WeatherData } from '@/models/weatherData';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface Context {
    favorites: WeatherData[];
    handleFavorite: (newFavorite: WeatherData) => void;
    loading: boolean;
    handleLoading: (isLoading: boolean) => void;
}

const AppContext = createContext<Context | undefined>(undefined);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<WeatherData[]>([]);
    const localStorage = new LocalStorageService();
    const initialRender = useRef(true);

    const handleLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };
    const handleFavorite = (newFavorite: WeatherData) => {
        const isCityInFavs: boolean = isCityInFavorites(newFavorite, favorites);

        !isCityInFavs && setFavorites((prev) => [...prev, newFavorite]);
        isCityInFavs && setFavorites((prev) => prev.filter((favorite) => favorite.id !== newFavorite.id));
    };

    useEffect(() => {
        const favoritesFromLocalStorage: WeatherData[] | null = localStorage.getItem(LocalStorageKey.FAVORITES);
        favoritesFromLocalStorage && setFavorites(favoritesFromLocalStorage);
    }, []);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        localStorage.setItem(LocalStorageKey.FAVORITES, favorites);
    }, [favorites]);

    return <AppContext.Provider value={{ favorites, handleFavorite, loading, handleLoading }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('Error en el contexto');
    return context;
};
