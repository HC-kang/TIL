/**
 * 지역 변수를 객체의 비공개 프로퍼티처럼 사용할 수 있다.
 */

var coffee = (function () {
  var price = 3000;

  return {
    name: "Americano",

    getPrice: function () {
      return price;
    },

    raisePrice: function () {
      price += 100;
    },
  }
}())

console.log(coffee.name); // Americano

console.log(coffee.getPrice()); // 3000

coffee.price = 4000;
console.log(coffee.getPrice()); // 3000

console.log(coffee); // coffee object

console.log(coffee.price); // 4000

coffee.raisePrice();
console.log(coffee.getPrice()); // 3100