// Я сделал этот файл основным местом для запросов к погоде.
// Он проверяет переменную USE_MOCKS: если она true, то берёт фейковые данные из mocks.ts.
// Если false, то делает реальные fetch-запросы к OpenWeather API.
// Координаты зашил прямо сюда (Новосибирск), чтобы не усложнять логику лишними поисками.

import type { ForecastResponse, AirQualityResponse } from '../types/weather';
import { fetchMockForecast, fetchMockAirQuality } from './mocks';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// Координаты Новосибирска
const LAT = 55.0084;
const LON = 82.9357;

export async function getForecast(): Promise<ForecastResponse> {
  if (USE_MOCKS) {
    return fetchMockForecast();
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=ru&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Не удалось загрузить прогноз погоды');
  }

  return await response.json();
}

export async function getAirQuality(): Promise<AirQualityResponse> {
  if (USE_MOCKS) {
    return fetchMockAirQuality();
  }

  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные о качестве воздуха');
  }

  return await response.json();
}