// Я вынес все вспомогательные функции в этот файл, чтобы не захламлять компоненты.
// Здесь только простая математика и форматирование: перевод ветра в стороны света, 
// конвертация давления, работа с датами.

export function getWindDirection(deg: number): string {
  // Преобразую градусы направления ветра в стороны света
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function convertPressure(hPa: number): number {
  // Переводю гектопаскали в мм рт. ст. (стандартный коэффициент)
  return Math.round(hPa * 0.750062);
}

export function formatDateTime(dateString: string): string {
  // Превращаю "2024-05-12 15:00:00" в "12 мая, 15:00"
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDayName(dateString: string): string {
  // Возвращаю полное название дня недели на русском
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', { weekday: 'long' });
}

export function isDayTime(dateString: string): boolean {
  // Определяю, день сейчас или ночь по часам из строки даты
  const hour = new Date(dateString).getHours();
  return hour >= 6 && hour < 20;
}