// Я сделал эту иконку для отображения погоды с переменной облачностью днём.
// Она совмещает солнце и облако в одном SVG, используя простые формы и наложение слоёв.
// Как и у остальных, использую currentColor и общий класс weather-icon, чтобы цвет и размер управлялись только через CSS.

export function CloudSunDay() {
  return (
    <svg
      className="weather-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Солнце на заднем плане */}
      <circle cx="15" cy="9" r="3.5" fill="currentColor" />
      <path
        d="M15 4v1M15 12v1M10.5 6.5L12 8M18 6.5L16.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Облако на переднем плане */}
      <path
        d="M14 19H7a6 6 0 1 1 5.7-7.7h1.3a4 4 0 1 1 0 7.7Z"
        fill="currentColor"
      />
    </svg>
  );
}