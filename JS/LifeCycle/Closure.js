function makeUnit(unit) {
  return function (value) {
    return `${value}${unit}`;
  };
}

let px = makeUnit('px');
let em = makeUnit('em');

console.log(px(12));
console.log(px(23));
console.log(em(34));
console.log(em(45));

// ---------------------------------------------

let mkUnit = (unit) => (value) => `${value}${unit}`;

let px2 = makeUnit('px');
let em2 = makeUnit('em');

console.log(px2(122));
console.log(px2(232));
console.log(em2(342));
console.log(em2(452));

// ---------------------------------------------
function getAdd() {
  let foo = 1;
  return function () {
    return foo++;
  }
}

add = getAdd();

console.log(add());
console.log(add());
console.log(foo)
foo = 10000
console.log(foo)
console.log(add());
console.log(add());
