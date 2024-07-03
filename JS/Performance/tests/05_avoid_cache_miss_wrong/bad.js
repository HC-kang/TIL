const K = 1024;
const length = 1 * K * K;

const points = new Array(length);
for (let i = 0; i < points.length; i++) {
  points[i] = { x: 42, y: 0 };
}

const shuffledPoints = shuffle(points.slice());

let _ = 0;
for (let i = 0; i < points.length; i++) {
  _ += shuffledPoints[i].x;
}

function shuffle(arr) {
  let curIdx = arr.length;

  while (curIdx !== 0) {
    let rndIdx = Math.floor(Math.random() * curIdx);
    curIdx--;

    [arr[curIdx], arr[rndIdx]] = [arr[rndIdx], arr[curIdx]];
  }

  return arr;
}