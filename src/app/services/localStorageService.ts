export enum LocalStorageKey {
    FAVORITES = 'Favorites',
}

export class LocalStorageService {
    setItem<T>(key: LocalStorageKey, item: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('Error al intentar establecer el elemento en el almacenamiento local:', error);
        }
    }

    getItem<T>(key: LocalStorageKey): T | null {
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;
            return JSON.parse(data) as T;
        } catch (error) {
            console.error('Error al intentar obtener el elemento del almacenamiento local:', error);
            return null;
        }
    }
}
