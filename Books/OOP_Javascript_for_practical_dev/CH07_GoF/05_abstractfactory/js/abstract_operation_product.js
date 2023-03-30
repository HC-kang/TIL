CALC.createNameSpace('CALC.abstractfactory.AbstractOperationProduct');

CALC.abstractfactory.AbstractOperationProduct = (function () {
  var AbstractOperationProduct;

  AbstractOperationProduct = function () {
    this.firstNumberOperandProduct = null;
    this.secondNumberOperandProduct = null;
  };

  AbstractOperationProduct.prototype.print = function () {
    throw new Error('You have to implement the method print!');
  };

  AbstractOperationProduct.prototype.setFirstNumberOperandProduct = function (
    firstNumberOperandProduct
  ) {
    this.firstNumberOperandProduct = firstNumberOperandProduct;
  };

  AbstractOperationProduct.prototype.setSecondNumberOperandProduct = function (
    secondNumberOperandProduct
  ) {
    this.secondNumberOperandProduct = secondNumberOperandProduct;
  };

  AbstractOperationProduct.prototype.add = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    return firstNumber + secondNumber;
  };

  AbstractOperationProduct.prototype.divide = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    return firstNumber / secondNumber;
  };

  AbstractOperationProduct.prototype.multiply = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    return firstNumber * secondNumber;
  };

  AbstractOperationProduct.prototype.subtract = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    return firstNumber - secondNumber;
  };

  AbstractOperationProduct.prototype.getFirstNumber = function () {
    return this.firstNumberOperandProduct.getNumber();
  };

  AbstractOperationProduct.prototype.getSecondNumber = function () {
    return this.secondNumberOperandProduct.getNumber();
  };

  AbstractOperationProduct.prototype.toString = function () {
    return 'AbstractOperationProduct';
  };

  return AbstractOperationProduct;
})();
