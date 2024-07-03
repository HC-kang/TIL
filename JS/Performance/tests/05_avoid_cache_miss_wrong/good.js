const K = 1024;
const length = 1 * K * K;

const points = new Array(length);
for (let i = 0; i < points.length; i++) {
  points[i] = { x: 42, y: 0 };
}

let _ = 0;
for (let i = 0; i < points.length; i++) {
  _ += points[i].x;
}
