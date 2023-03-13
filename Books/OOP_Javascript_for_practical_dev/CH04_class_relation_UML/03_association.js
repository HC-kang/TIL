/**
 * 연관 (Association)
 * - 한 사물의 객체가 다른 사물과 연결되어 있음을 표시
 */

function Espresso() {
  this.name = "Espresso";
}

Espresso.prototype.display = function () {
  console.log(this.name);
};

function Barista() {
  // Barista 객체의 프로퍼티로 'espressoMachine'을 정의
  this.espressoMachine = null;
}

Barista.prototype.setEspressoMachine = function (espressoMachine) {
  this.espressoMachine = espressoMachine;
};

// Barista 객체는 espressoMachine 객체 내부의 makeEspresso() 메서드를 사용함.
Barista.prototype.makeEspresso = function () {
  var espresso = this.espressoMachine.makeEspresso;
  return espresso;
};

// ----------------------------------------------
function EspressoMachine() {
  this.price = 300_000;
}

// EspressoMachine 객체는 makeEspresso() 메서드를 가짐.
EspressoMachine.prototype.makeEspresso = function () {
  return new Espresso();
};

// ----------------------------------------------
// Barista 객체를 생성하고, EspressoMachine 객체를 생성하여 Barista 객체의 프로퍼티로 할당
var barista = new Barista();
var espressoMachine = new EspressoMachine();
barista.setEspressoMachine(espressoMachine);

// Barista 객체로부터 espresso 객체를 생성
var espresso = barista.makeEspresso();

espresso.display(); // Espresso
