/**
 * 합성 (Composition)
 * - 전체와 부분간의 관계를 표현
 * - 전체가 소멸도리 때 부분도 함께 소멸됨
 */

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
  // 객체의 내부에서 프로퍼티값 생성
  this.espresso = new Espresso();
  this.milk = new Milk();
}

CafeLatte.prototype.display = function () {
  console.log(this.name + "(" + this.espresso + " + " + this.milk + ")");
};

var cafeLatte = new CafeLatte();

cafeLatte.display(); // CafeLatte(Espresso + Milk)
