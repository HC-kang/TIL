/**
 * 생성자 안에서만 접근 가능한 지역변수를 객체의 비공개 프로퍼티로 활용
 */

function Coffee(name) {
  var price = 3000;
  this.name = name;

  this.getPrice = function () {
    return price;
  };

  this.raisePrice = function () {
    price += 100;
  };
}

var coffee = new Coffee("Americano");

console.log(coffee.name); // Americano

console.log(coffee.getPrice()); // 3000

coffee.price = 4000;
console.log(coffee.getPrice()); // 3000

console.log(coffee); // coffee object

console.log(coffee.price); // 4000

coffee.raisePrice();
console.log(coffee.getPrice()); // 3100

var espresso = new Coffee("Espresso");

console.log(espresso.name); // Espresso

console.log(espresso.getPrice()); // 3000