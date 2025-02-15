export function clearScreen() {
  process.stdout.write('\x1b[2J');
}

export function moveCursor(x: number, y: number) {
  process.stdout.write(`\x1b[${y};${x}H`);
} 