/**
 * 의존 (Dependency)
 * - 한 사물이 변경되면 이것을 사용하는 다른 사물에 영향을 미치는 관계
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

  this.espresso = null;
  this.milk = null;
}

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

// Barista는 makeEspresso 메소드의 리턴값으로 Espresso를 필요로 하며, Espresso애 '리턴값 의존'하고 있음
Barista.prototype.makeEspresso = function () {
  var coffeeBeans = new CoffeeBeans();

  var espresso = this.espressoMachine.makeEspresso(coffeeBeans);

  return espresso;
};

// Barista는 makeCafeLatte 메소드를 통해 CafeLatte를 리턴하며,
// 이때 cafeLatte의 지역변수로 Milk를 필요로 함. 따라서 Barista는 Milk에 '지역변수 의존' 하고있음.
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

// EspressoMachine은 coffeeBeans라는 변수를 함수 인자로 사용해야 하며, 따라서 '함수인자값 의존'하고 있음
EspressoMachine.prototype.makeEspresso = function (coffeeBeans) {
  console.log("" + coffeeBeans);

  return new Espresso();
};

var barista = new Barista();

var espressoMachine = new EspressoMachine();

barista.setEspressoMachine(espressoMachine);

var cafeLatte = barista.makeCafeLatte();

cafeLatte.display(); // CafeLatte(Espresso + Milk)
