/**
 * 집합 (Aggregation)
 * - 전체과 부분간의 관계를 표현함.
 */

function CoffeeBeans() {
  this.countryOfOrigin = "Columbia";
}

CoffeeBeans.prototype.toString = function () {
  return "Coffee Beans from " + this.countryOfOrigin;
};

function Espresso() {
  this.name = "Espresso";
}

Espresso.prototype.toString = function () {
  return "Espresso";
};

function Milk() {
  this.name = "Milk";
}

Milk.prototype.toString = function () {
  return "Milk";
};

function CafeLatte() {
  this.name = "CafeLatte";

  // CafeLatte 객체의 프로퍼티
  this.espresso = null;
  this.milk = null;
}

// CafeLatte 객체의 메서드를 외부에서 컨트롤할 인터페이스를 제공
CafeLatte.prototype.setEspresso = function (espresso) {
  this.espresso = espresso;
};
CafeLatte.prototype.setMilk = function (milk) {
  this.milk = milk;
};

CafeLatte.prototype.display = function () {
  console.log(this.name + "(" + this.espresso + " + " + this.milk + ")");
};

function Barista() {
  this.espressoMachine = null;
}

Barista.prototype.setEspressoMachine = function (espressoMachine) {
  this.espressoMachine = espressoMachine;
};

Barista.prototype.makeCafeLatte = function () {
  var coffeeBeans = new CoffeeBeans();
  var espresso = this.espressoMachine.makeEspresso(coffeeBeans);
  var milk = new Milk();

  var cafeLatte = new CafeLatte();

  cafeLatte.setEspresso(espresso);
  cafeLatte.setMilk(milk);

  return cafeLatte;
};

function EspressoMachine() {
  this.price = 300_000;
}

EspressoMachine.prototype.makeEspresso = function (coffeeBeans) {
  console.log("" + coffeeBeans);

  return new Espresso();
};

var barista = new Barista();

var espressoMachine = new EspressoMachine();

barista.setEspressoMachine(espressoMachine);

var cafeLatte = barista.makeCafeLatte();

cafeLatte.display(); // CafeLatte(Espresso + Milk)
