CALC.createNameSpace('CALC.templatemethod.AbstractOperation');

CALC.templatemethod.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {
    this.firstNumber = 0;
    this.secondNumber = 0;
  };

  AbstractOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method getAnswer!');
  };

  AbstractOperation.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator!');
  };

  AbstractOperation.prototype.operate = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var operator = this.getOperator();

    var answer = this.getAnswer(firstNumber, secondNumber);

    var result = firstNumber + operator + secondNumber + ' = ' + answer;

    this.print(result);
  };

  AbstractOperation.prototype.print = function (result) {
    console.log(result);
  };

  AbstractOperation.prototype.getFirstNumber = function () {
    return this.firstNumber;
  };

  AbstractOperation.prototype.setFirstNumber = function (firstNumber) {
    this.firstNumber = firstNumber;
  };

  AbstractOperation.prototype.getSecondNumber = function () {
    return this.secondNumber;
  };

  AbstractOperation.prototype.setSecondNumber = function (secondNumber) {
    this.secondNumber = secondNumber;
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
