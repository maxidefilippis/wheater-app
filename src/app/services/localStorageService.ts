export enum LocalStorageKey {
    FAVORITES = 'favorites',
}

export class LocalStorageService {
    setItem<T>(key: LocalStorageKey | string, item: T): void {
        localStorage.setItem(key, JSON.stringify(item));
    }
    getItem<T>(key: LocalStorageKey | string): T | null {
        const data = localStorage.getItem(key);
        if (!data) return null;
        return JSON.parse(data) as T;
    }
}
