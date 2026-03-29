import React, { useState, useEffect, useContext, createContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'mj-theme';

function readStoredTheme() {
    try {
        const s = localStorage.getItem(STORAGE_KEY);
        if (s === 'dark' || s === 'light') return s;
    } catch {
        /* ignore */
    }
    return 'light';
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(readStoredTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};