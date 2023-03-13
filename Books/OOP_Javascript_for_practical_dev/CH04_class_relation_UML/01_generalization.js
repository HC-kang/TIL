/**
 * 상속 (Generalization)
 * - 일반화된 사물과 특수화된 사물과의 관계를 표현함.
 */


/**
 *  '커피' 라는 일반화된 사물 구현
 */ 
function Coffee() {
  this.name = "Coffee";
}

Coffee.prototype.getName = function () {
  return this.name;
};

Coffee.prototype.setName = function (name) {
  this.name = name;
};

Coffee.prototype.display = function () {
  console.log(this.name);
};

var coffee = new Coffee();

console.log(coffee.name); // Coffee

console.log(coffee.getName()); // Coffee

coffee.display(); // Coffee

// ----------------------------------------------
/**
 * '커피'를 바탕으로 '에스프레소'라는 구체화된 사물 구현
 */
function Espresso() {
  Coffee.call(this);
}

var espresso = new Espresso();

console.log(espresso.name); // Espresso
// console.log(espresso.getName()); // espresso.getName is not a function
// espresso.display(); // espresso.display is not a function

Espresso.prototype = Object.create(Coffee.prototype, {
  constructor: {
    value: Espresso,
    configurable: true,
    enumerable: true,
    writable: true,
  },
});

var espresso = new Espresso();
espresso.setName("Espresso");

console.log(espresso.name); // Espresso

console.log(espresso.getName()); // Espresso

espresso.display(); // Espresso
