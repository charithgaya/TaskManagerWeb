'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute = "class" // Use the 'class' strategy to toggle dark mode
            defaultTheme = "system" // follow the system theme by default
            enableSystem = {true}
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
};