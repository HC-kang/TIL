var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // window, 1, 2, 3

func.call({ x: 1 }, 4, 5, 6); // {x: 1}, 4, 5, 6
func.apply({ x: 1 }, [4, 5, 6]); // {x: 1}, 4, 5, 6

// ------------------------------
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

Array.prototype.push.call(obj, 'd');
console.log(obj); // {0: "a", 1: "b", 2: "c", 3: "d", length: 4}

var arr = Array.prototype.slice.call(obj);
console.log(arr); // ["a", "b", "c", "d"]
