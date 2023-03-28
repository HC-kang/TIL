CALC.createNameSpace('CALC.factorymethod.AbstractOperation');

CALC.factorymethod.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {
    this.firstNumber = 0;
    this.secondNumber = 0;
  };

  AbstractOperation.prototype.operate = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var operator = this.getOperator();

    var operatorDescription = this.getOperatorDescription();

    var answer = operator.getAnswer(firstNumber, secondNumber);

    var result =
      firstNumber +
      ' ' +
      operatorDescription +
      ' ' +
      secondNumber +
      ' = ' +
      answer;

    this.print(result);
  };

  AbstractOperation.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator!');
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

  AbstractOperation.prototype.print = function (result) {
    console.log(result);
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
