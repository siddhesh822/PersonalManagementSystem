export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function getColor() {
  const colors = [
    "#C0C0C0",
    "#DB7093",
    "#FF6347",
    "#F4A460",
    "#000000",
    "#9932CC",
    "#87CEFA",
    "#DDA0DD",
    "#48D1CC"
  ];

  return `${rando(colors)}`;
}
