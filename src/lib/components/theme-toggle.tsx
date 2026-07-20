import { Classic } from '@theme-toggles/react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import '@theme-toggles/react/styles/classic.css';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [setTheme, resolvedTheme]);

  return <Classic className="text-3xl" onClick={toggleTheme} />;
}
