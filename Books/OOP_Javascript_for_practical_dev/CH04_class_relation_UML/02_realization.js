/**
 * 구현 (Realization)
 * - 추상화된 인터페이스와 실제로 구현한 사물과의 관계를 표현
 */

function ICoffee() {}

// 추상 메서드 모의
ICoffee.prototype.getName = function () {
  throw new Error("You have to implement the method getName!");
};

ICoffee.prototype.setName = function (name) {
  throw new Error("You have to implement the method setName!");
};

ICoffee.prototype.display = function () {
  throw new Error("You have to implement the method display!");
};

// ----------------------------------------------
function Espresso() {
  this.name = "Espresso";
}

Espresso.prototype = Object.create(ICoffee.prototype, {
  constructor: {
    value: Espresso,
    configurable: true,
    enumerable: true,
    writable: true,
  },
});

// 추상 메서드 구체화
Espresso.prototype.getName = function () {
  return this.name;
};

Espresso.prototype.setName = function (name) {
  this.name = name;
};

Espresso.prototype.display = function () {
  console.log(this.name);
};

// 실제 구현체 작성
var espresso = new Espresso();

console.log(espresso.name); // Espresso

console.log(espresso.getName()); // Espresso

espresso.display(); // Espresso
