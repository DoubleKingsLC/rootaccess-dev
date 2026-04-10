export function drawToolsBranch(
  from: { x: number; y: number },
  toBox: { x: number; y: number },
  _layout?: unknown
) {
  const r = 14;
  const i = 3;
  const startY = from.y + (i - 1) * 24;
  const jX = 140 + i * 28;
  const jY = from.y + 110;
  const jX2 = toBox.x - 30;

  const cX = from.x + 30;
  const endSX = from.x + 60;
  const connectY = toBox.y + 40;

  return [
    `M ${from.x} ${from.y}`,
    `C ${cX} ${from.y}, ${cX} ${startY}, ${endSX} ${startY}`,
    `L ${jX - r} ${startY}`,
    `Q ${jX} ${startY} ${jX} ${startY + r}`,
    `L ${jX} ${jY - r}`,
    `Q ${jX} ${jY} ${jX + r} ${jY}`,
    `L ${jX2 - r} ${jY}`,
    `Q ${jX2} ${jY} ${jX2} ${jY - r}`,
    `L ${jX2} ${connectY + r}`,
    `Q ${jX2} ${connectY} ${jX2 + r} ${connectY}`,
    `L ${toBox.x} ${connectY}`,
  ].join(" ");
}

export function drawBranch(
  from: { x: number; y: number },
  to: { x: number; y: number },
  i: number
) {
  const r = 14;
  const startY = from.y + (i - 1) * 24;
  const jX = 140 + i * 28;
  const jY = to.y - 70 + i * 20;

  const cX = from.x + 30;
  const endSX = from.x + 60;

  return [
    `M ${from.x} ${from.y}`,
    `C ${cX} ${from.y}, ${cX} ${startY}, ${endSX} ${startY}`,
    `L ${jX - r} ${startY}`,
    `Q ${jX} ${startY} ${jX} ${startY + r}`,
    `L ${jX} ${jY - r}`,
    `Q ${jX} ${jY} ${jX + r} ${jY}`,
    `L ${to.x - r} ${jY}`,
    `Q ${to.x} ${jY} ${to.x} ${jY + r}`,
    `L ${to.x} ${to.y}`,
  ].join(" ");
}
