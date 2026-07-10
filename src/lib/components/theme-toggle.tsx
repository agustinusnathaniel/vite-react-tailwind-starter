import { Classic } from '@theme-toggles/react';
import { useTheme } from 'next-themes';
import { type SetStateAction, useCallback } from 'react';
import '@theme-toggles/react/css/Classic.css';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggle = useCallback(
    (light: SetStateAction<boolean>) => setTheme(light ? 'light' : 'dark'),
    [setTheme]
  );

  return (
    <Classic
      className="text-3xl"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder=""
      toggle={handleToggle}
      toggled={resolvedTheme === 'light'}
    />
  );
}
