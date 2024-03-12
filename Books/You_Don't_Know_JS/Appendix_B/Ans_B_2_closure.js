function range(start, end) {
  start = Number(start) || 0;
  if (end === undefined) {
    return function getEnd(end) {
      return getRange(start, end);
    }
  } else {
    end = Number(end) || 0;
    return getRange(start, end);
  }
}

function getRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(3, 3));      // [3]
console.log(range(3, 8));      // [3,4,5,6,7,8]
console.log(range(3, 0));      // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3));        // [3]
console.log(start3(8));        // [3,4,5,6,7,8]
console.log(start3(0));        // []

console.log(start4(6));        // [4,5,6]
