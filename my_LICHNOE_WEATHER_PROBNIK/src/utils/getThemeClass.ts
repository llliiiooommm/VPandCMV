// Я вынес логику выбора темы в отдельный файл, чтобы не смешивать её с компонентами.
// Функция принимает основную погоду (Clear, Clouds, Rain...) и флаг день/ночь.
// Возвращает просто строку с названием CSS-класса, а фон и цвета потом меняются через стили.

export function getThemeClass(weatherMain: string, isDay: boolean): string {
  if (weatherMain === 'Clear') {
    // Если ясно: днём синяя тема, ночью тёмно-синяя
    return isDay ? 'theme-sunny' : 'theme-night';
  }
  
  // Для всего остального (облака, дождь, снег, туман) ставлю серую тему
  return 'theme-grey';
}