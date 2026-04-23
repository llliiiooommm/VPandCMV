// Я сделал эту иконку простым SVG-компонентом, чтобы не тянуть сторонние библиотеки.
// Она возвращает только тег <svg> без лишних оберток и стилей.
// Класс 'weather-icon' я буду использовать в глобальном CSS для задания размера и цвета.

export function SunDay() {
  return (
    <svg
      className="weather-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path
        d="M12 2V4M12 20V22M4 12H2M22 12H20M6.34 6.34L4.93 4.93M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}