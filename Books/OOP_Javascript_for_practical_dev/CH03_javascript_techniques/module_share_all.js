var Coffee = (function () {
  var price = 3000;

  function Coffee(name) {
    this.name = name;
  }

  Coffee.prototype.getPrice = function () {
    return price;
  };

  Coffee.prototype.raisePrice = function () {
    price += 100;
  };

  return Coffee;
})();

var coffee = new Coffee("Americano");
var espresso = new Coffee("Espresso");

console.log(coffee.name); // Americano
console.log(coffee.getPrice()); // 3000

console.log(espresso.name); // Espresso
console.log(espresso.getPrice()); // 3000

coffee.raisePrice();
console.log(coffee.getPrice()); // 3100
console.log(espresso.getPrice()); // 3100
