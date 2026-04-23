// Я создал этот компонент-обёртку, чтобы применять нужную тему ко всему контенту приложения.
// Он принимает строку с названием CSS-класса темы и оборачивает в неё все дочерние элементы.
// Так я могу менять фон и цвета всего приложения, просто переключая один className в App.tsx.

import type { ReactNode } from 'react';

interface Props {
  themeClass: string;
  children: ReactNode;
}

export function WeatherWrapper({ themeClass, children }: Props) {
  return (
    <div className={`app-wrapper ${themeClass}`}>
      {children}
    </div>
  );
}