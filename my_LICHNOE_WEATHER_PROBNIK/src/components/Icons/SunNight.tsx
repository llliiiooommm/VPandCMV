// Я создал эту иконку для отображения ночной погоды.
// Она возвращает только SVG без лишних обёрток, чтобы все стили задавались через глобальный CSS.
// Использую currentColor, чтобы иконка автоматически подстраивалась под цвет текста в ночной теме.

export function SunNight() {
  return (
    <svg
      className="weather-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
      />
    </svg>
  );
}