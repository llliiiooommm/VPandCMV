// Здесь я импортирую все CSS-файлы из папки styles, чтобы они применились глобально.
// Затем рендерю главный компонент App в корневой div с id="root".
// Использую StrictMode для выявления потенциальных проблем на этапе разработки, как рекомендует React.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Импортирую все стили проекта в одном месте, чтобы не раскидывать их по компонентам
import './styles/reset.css';
import './styles/variables.css';
import './styles/themes.css';
import './styles/wrapper.css';
import './styles/current-weather.css';
import './styles/daily-forecast.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);