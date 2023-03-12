/**
 * 변수와 메소드를 정의해 두고, 반환 객체에 앞서 정의한 값과 메소드를 노출한다.
 */
var coffee = (function () {
  var price = 3000;
  
  function getPrice() {
    return price;
  }

  function raisePrice() {
    price += 100;
  }

  return {
    name: "Americano",
    getPrice: getPrice,
    raisePrice: raisePrice,
  }
}());

console.log(coffee.name); // Americano

console.log(coffee.getPrice()); // 3000

coffee.price = 4000;
console.log(coffee.getPrice()); // 3000

console.log(coffee); // coffee object

console.log(coffee.price); // 4000

coffee.raisePrice();
console.log(coffee.getPrice()); // 3100