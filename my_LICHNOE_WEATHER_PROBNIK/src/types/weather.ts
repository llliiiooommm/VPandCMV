// Я создал этот файл, чтобы TypeScript понимал, какие данные приходят с OpenWeather.
// Здесь я описал только те поля, которые реально буду использовать в приложении.
// Так мне будет проще работать с ответами API, а редактор кода будет подсказывать ошибки.

export interface WeatherCondition {
  id: number;
  main: string;      // "Clear", "Clouds", "Rain", "Snow" и т.д.
  description: string;
  icon: string;      // код иконки, который OpenWeather отдаёт в ответе
}

export interface WeatherDataPoint {
  dt: number;        // время в UNIX
  dt_txt: string;    // время в удобном формате "YYYY-MM-DD HH:MM:SS"
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number; // давление в гПа
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;      // направление ветра в градусах
  };
  pop: number;        // вероятность осадков от 0 до 1
}

export interface ForecastResponse {
  city: {
    name: string;
    coord: { lat: number; lon: number };
  };
  list: WeatherDataPoint[];
}

export interface AirQualityResponse {
  list: Array<{
    main: { aqi: number }; // 1 (хорошее) ... 5 (опасное)
    components: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
    };
  }>;
}