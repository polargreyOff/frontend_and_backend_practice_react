import { useState } from "react";

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;

            const parsed = JSON.parse(item);

            // 🔥 1. Если массив → всё ок
            if (Array.isArray(parsed)) {
                return parsed;
            }

            // 🔥 2. Если объект формата { technologies: [...] }
            if (parsed && typeof parsed === "object" && Array.isArray(parsed.technologies)) {
                console.warn(`[useLocalStorage] Обнаружен объект экспорта. Использую только technologies[].`);
                return parsed.technologies;
            }

            // 🔥 3. Иначе — формат некорректен → сброс
            console.warn(
                `[useLocalStorage] Неверный формат данных. Ожидался массив. Сбрасываю в initialValue.`
            );
            return initialValue;
        } catch (err) {
            console.error(`Ошибка чтения localStorage[${key}]:`, err);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            // Записываем строго массив технологий
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error(`Ошибка записи localStorage[${key}]:`, err);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
