// Я создал эту иконку для отображения облачной погоды.
// Это простой SVG-путь, который рисует аккуратное облако без лишних деталей.
// Использую fill="currentColor", чтобы цвет иконки автоматически подстраивался под тему через CSS.

export function Cloud() {
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
    </svg>
  );
}