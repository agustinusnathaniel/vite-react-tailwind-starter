import { Classic } from '@theme-toggles/react';
import { useTheme } from 'next-themes';
import '@theme-toggles/react/css/Classic.css';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Classic
      className="text-3xl"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder=""
      toggle={(light) => setTheme(light ? 'light' : 'dark')}
      toggled={resolvedTheme === 'light'}
    />
  );
}
