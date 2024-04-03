function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

var addTo10 = adder(10);
var addTo42 = adder(42);

console.log(addTo10(3)); // 13
console.log(addTo42(3)); // 45