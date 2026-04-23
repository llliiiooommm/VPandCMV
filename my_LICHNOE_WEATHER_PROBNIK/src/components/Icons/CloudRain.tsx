// Я сделал эту иконку для отображения дождливой погоды.
// Она сочетает в себе облако и несколько простых капель, нарисованных SVG-линиями.
// Как и у остальных иконок, использую currentColor, чтобы цвет автоматически подстраивался под тему через CSS.

export function CloudRain() {
  return (
    <svg
      className="weather-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="currentColor"
      />
      <path
        d="M12 20v2M15 21v2M9 21v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}