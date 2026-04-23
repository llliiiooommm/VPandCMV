// src/App.tsx
// Я сделал этот файл главным контроллером приложения.
// Здесь я храню состояние погоды, запускаю загрузку данных при старте и настраиваю автообновление каждые 3 часа.
// Определяю тему на основе текущего времени и погоды, а затем передаю всё в компоненты для отрисовки.
// Код максимально простой: только базовые хуки, чистые импорты и никаких inline-стилей.

import { useState, useEffect } from 'react';
import type { WeatherDataPoint, AirQualityResponse } from './types/weather';
import { getForecast, getAirQuality } from './api/weatherApi';
import { getThemeClass } from './utils/getThemeClass';
import { isDayTime } from './utils/helpers';
import { WeatherWrapper } from './components/WeatherWrapper';
import { CurrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';

export default function App() {
  const [forecastList, setForecastList] = useState<WeatherDataPoint[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityResponse['list'][0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Вынес загрузку в отдельную функцию, чтобы вызывать её и при старте, и по таймеру
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [forecastRes, airRes] = await Promise.all([getForecast(), getAirQuality()]);
      setForecastList(forecastRes.list);
      setAirQuality(airRes.list[0]);
    } catch (err) {
      setError('Не удалось загрузить данные. Проверьте интернет или переключите моки.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загружаю данные при первом открытии приложения
  useEffect(() => {
    fetchData();
  }, []);

  // Автообновление каждые 3 часа (3 * 60 * 60 * 1000 мс)
  useEffect(() => {
    const interval = setInterval(fetchData, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval); // Очищаю таймер при закрытии вкладки
  }, []);

  // Состояния загрузки и ошибки отображаю простыми блоками
  if (loading && forecastList.length === 0) {
    return (
      <WeatherWrapper themeClass="theme-sunny">
        <p className="status-text">Загрузка погоды...</p>
      </WeatherWrapper>
    );
  }

  if (error) {
    return (
      <WeatherWrapper themeClass="theme-grey">
        <p className="status-text error">{error}</p>
      </WeatherWrapper>
    );
  }

  // Беру первую запись из списка как "текущую погоду"
  const current = forecastList[0];
  const isDay = isDayTime(current.dt_txt);
  const themeClass = getThemeClass(current.weather[0].main, isDay);

  return (
    <WeatherWrapper themeClass={themeClass}>
      <header className="app-header">
        <h1>🌤️ Погода в Новосибирске</h1>
        <p className="update-info">Обновлено: {new Date().toLocaleTimeString('ru-RU')}</p>
      </header>

      <CurrentWeather current={current} airQuality={airQuality!} />
      <DailyForecast forecastList={forecastList} />
    </WeatherWrapper>
  );
}