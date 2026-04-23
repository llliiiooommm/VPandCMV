// Я создал этот компонент, чтобы выводить всю основную информацию о текущей погоде в одном месте.
// Он принимает данные прогноза и качества воздуха, форматирует их с помощью утилит и выбирает подходящую иконку.
// Никакой сложной логики здесь нет: только отображение данных через className, как и требовалось в задании.

import type { WeatherDataPoint, AirQualityResponse } from '../types/weather';
import { convertPressure, getWindDirection, isDayTime } from '../utils/helpers';
import { SunDay, SunNight, Cloud, CloudRain, CloudSnow, CloudSunDay, CloudSunNight } from './Icons';

interface Props {
  current: WeatherDataPoint;
  airQuality: AirQualityResponse['list'][0];
}

// Простая функция для выбора иконки.
function selectIcon(main: string, isNight: boolean) {
  if (main === 'Clear') return isNight ? <SunNight /> : <SunDay />;
  if (main === 'Clouds') return isNight ? <CloudSunNight /> : <CloudSunDay />;
  if (main === 'Rain' || main === 'Drizzle') return <CloudRain />;
  if (main === 'Snow') return <CloudSnow />;
  return <Cloud />; // запасной вариант
}

export function CurrentWeather({ current, airQuality }: Props) {
  const isNight = !isDayTime(current.dt_txt);
  const IconComponent = selectIcon(current.weather[0].main, isNight);

  const pressureMmHg = convertPressure(current.main.pressure);
  const windDir = getWindDirection(current.wind.deg);

  return (
    <div className="current-weather">
      <div className="current-weather-header">
        {IconComponent}
        <div className="temp-block">
          <span className="temp-value">{Math.round(current.main.temp)}°C</span>
          <span className="temp-desc">{current.weather[0].description}</span>
        </div>
      </div>

      <div className="current-weather-details">
        <div className="detail-item">
          <span className="detail-label">Ветер</span>
          <span className="detail-value">{current.wind.speed} м/с, {windDir}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Влажность</span>
          <span className="detail-value">{current.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Давление</span>
          <span className="detail-value">{pressureMmHg} мм рт. ст.</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Загрязнение (AQI)</span>
          <span className="detail-value">{airQuality.main.aqi} / 5</span>
        </div>
      </div>
    </div>
  );
}