// Я создал этот компонент, чтобы показывать прогноз на несколько дней вперёд.
// Он принимает список точек прогноза, группирует их по датам и для каждого дня
// находит температуру утром, ночью и выбирает подходящую иконку.
// Логика группирования максимально простая: разбиваю строку даты по пробелу, собираю в Map.

import type { WeatherDataPoint } from '../types/weather';
import { isDayTime } from '../utils/helpers';
import { SunDay, SunNight, Cloud, CloudRain, CloudSnow, CloudSunDay, CloudSunNight } from './Icons';

interface Props {
  forecastList: WeatherDataPoint[];
}

// Локальная функция для выбора иконки. Оставил её здесь для простоты,
// чтобы не создавать лишних файлов и импортов.
function getIconForForecast(main: string, isNight: boolean) {
  if (main === 'Clear') return isNight ? <SunNight /> : <SunDay />;
  if (main === 'Clouds') return isNight ? <CloudSunNight /> : <CloudSunDay />;
  if (main === 'Rain' || main === 'Drizzle') return <CloudRain />;
  if (main === 'Snow') return <CloudSnow />;
  return <Cloud />;
}

export function DailyForecast({ forecastList }: Props) {
  if (!forecastList.length) return null;

  // 1. Группирую все точки прогноза по дням (по дате "YYYY-MM-DD")
  const daysMap = new Map<string, WeatherDataPoint[]>();
  forecastList.forEach(point => {
    const dateKey = point.dt_txt.split(' ')[0];
    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, []);
    }
    daysMap.get(dateKey)!.push(point);
  });

  // 2. Формирую удобный массив для рендера
  const dailyData = Array.from(daysMap.entries()).map(([date, points]) => {
    // Утро: ищем запись между 6 и 12 часами, иначе берём первую
    const morning = points.find(p => {
      const h = new Date(p.dt_txt).getHours();
      return h >= 6 && h < 12;
    }) || points[0];

    // Ночь: ищем запись после 21 часа, иначе берём последнюю
    const night = points.find(p => {
      const h = new Date(p.dt_txt).getHours();
      return h >= 21;
    }) || points[points.length - 1];

    // Иконка: беру запись ближе к полудню
    const midday = points.find(p => {
      const h = new Date(p.dt_txt).getHours();
      return h >= 12 && h < 15;
    }) || points[1] || points[0];

    const isNightIcon = !isDayTime(midday.dt_txt);

    return {
      date,
      morningTemp: Math.round(morning.main.temp),
      nightTemp: Math.round(night.main.temp),
      icon: getIconForForecast(midday.weather[0].main, isNightIcon),
    };
  });

  // 3. Рендерю список дней
  return (
    <div className="daily-forecast">
      <h2 className="forecast-title">Прогноз на дни</h2>
      <div className="forecast-grid">
        {dailyData.map((day) => (
          <div key={day.date} className="forecast-card">
            <span className="forecast-day">
              {new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
            <div className="forecast-icon">{day.icon}</div>
            <div className="forecast-temps">
              <span className="temp-morning">🌅 {day.morningTemp}°</span>
              <span className="temp-night">🌙 {day.nightTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 