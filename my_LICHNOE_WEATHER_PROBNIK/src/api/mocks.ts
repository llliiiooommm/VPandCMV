// Я создал этот файл, чтобы тестировать приложение без реальных запросов к API.
// Здесь лежат заранее заготовленные данные, которые полностью повторяют структуру ответов OpenWeather.
// Функции возвращают промисы с небольшой задержкой, чтобы имитировать реальную работу сети.

import type { ForecastResponse, AirQualityResponse } from '../types/weather';

// Фейковый ответ прогноза погоды для Новосибирска (8 точек = 24 часа)
const mockForecast: ForecastResponse = {
  city: { name: 'Новосибирск', coord: { lat: 55.0084, lon: 82.9357 } },
  list: [
    // 0 - Сейчас (ясно, день)
    { dt: Date.now() / 1000, dt_txt: new Date().toISOString(), main: { temp: 14, feels_like: 12, temp_min: 10, temp_max: 16, humidity: 45, pressure: 1015 }, weather: [{ id: 800, main: 'Clear', description: 'ясное небо', icon: '01d' }], wind: { speed: 3.5, deg: 270 }, pop: 0.0 },
    // 1 - Через 3ч (облачно)
    { dt: Date.now() / 1000 + 10800, dt_txt: new Date(Date.now() + 10800).toISOString(), main: { temp: 16, feels_like: 15, temp_min: 14, temp_max: 18, humidity: 50, pressure: 1014 }, weather: [{ id: 803, main: 'Clouds', description: 'облачно', icon: '04d' }], wind: { speed: 4.0, deg: 290 }, pop: 0.2 },
    // 2 - Через 6ч (дождь)
    { dt: Date.now() / 1000 + 21600, dt_txt: new Date(Date.now() + 21600).toISOString(), main: { temp: 12, feels_like: 10, temp_min: 10, temp_max: 13, humidity: 80, pressure: 1012 }, weather: [{ id: 500, main: 'Rain', description: 'небольшой дождь', icon: '10d' }], wind: { speed: 5.2, deg: 180 }, pop: 0.8 },
    // 3 - Через 9ч (ночь, ясно)
    { dt: Date.now() / 1000 + 32400, dt_txt: new Date(Date.now() + 32400).toISOString(), main: { temp: 8, feels_like: 6, temp_min: 6, temp_max: 9, humidity: 65, pressure: 1016 }, weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01n' }], wind: { speed: 2.1, deg: 45 }, pop: 0.0 },
    // 4-7 - Заполняю остаток списка похожими данными для теста прокрутки
    { dt: Date.now() / 1000 + 43200, dt_txt: new Date(Date.now() + 43200).toISOString(), main: { temp: 7, feels_like: 5, temp_min: 5, temp_max: 8, humidity: 70, pressure: 1017 }, weather: [{ id: 802, main: 'Clouds', description: 'переменная облачность', icon: '03n' }], wind: { speed: 1.8, deg: 90 }, pop: 0.1 },
    { dt: Date.now() / 1000 + 54000, dt_txt: new Date(Date.now() + 54000).toISOString(), main: { temp: 9, feels_like: 7, temp_min: 7, temp_max: 10, humidity: 60, pressure: 1018 }, weather: [{ id: 600, main: 'Snow', description: 'снег', icon: '13d' }], wind: { speed: 4.5, deg: 310 }, pop: 0.9 },
    { dt: Date.now() / 1000 + 64800, dt_txt: new Date(Date.now() + 64800).toISOString(), main: { temp: 13, feels_like: 11, temp_min: 11, temp_max: 15, humidity: 55, pressure: 1015 }, weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }], wind: { speed: 3.0, deg: 135 }, pop: 0.0 },
    { dt: Date.now() / 1000 + 75600, dt_txt: new Date(Date.now() + 75600).toISOString(), main: { temp: 15, feels_like: 14, temp_min: 13, temp_max: 17, humidity: 48, pressure: 1014 }, weather: [{ id: 801, main: 'Clouds', description: 'малооблачно', icon: '02d' }], wind: { speed: 2.8, deg: 200 }, pop: 0.1 },
  ],
};

// Фейковый ответ качества воздуха
const mockAirQuality: AirQualityResponse = {
  list: [{
    main: { aqi: 2 }, // 2 = Хорошее качество
    components: { co: 280, no2: 18, o3: 65, so2: 6, pm2_5: 14, pm10: 22 },
  }],
};

// Функция-заглушка для получения прогноза
export function fetchMockForecast(): Promise<ForecastResponse> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockForecast), 500); // Имитирую задержку сети 0.5 сек
  });
}

// Функция-заглушка для получения качества воздуха
export function fetchMockAirQuality(): Promise<AirQualityResponse> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAirQuality), 400); // Имитирую задержку сети 0.4 сек
  });
}