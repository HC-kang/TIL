CALC.createNameSpace('CALC.prototype.AbstractOperationPrototype');

CALC.prototype.AbstractOperationPrototype = (function () {
  var AbstractOperationPrototype;

  AbstractOperationPrototype = function (operation) {
    this.firstNumber = 0;
    this.secondNumber = 0;

    if (operation != null) {
      this.firstNumber = operation.firstNumber;
      this.secondNumber = operation.secondNumber;
    }
  };

  AbstractOperationPrototype.prototype.getClone = function () {
    throw new Error('You have to implement the method getClone!');
  };

  AbstractOperationPrototype.prototype.getAnswer = function () {
    throw new Error('You have to implement the method getAnswer!');
  };

  AbstractOperationPrototype.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator!');
  };

  AbstractOperationPrototype.prototype.getFirstNumber = function () {
    return this.firstNumber;
  };

  AbstractOperationPrototype.prototype.setFirstNumber = function (firstNumber) {
    this.firstNumber = firstNumber;
  };

  AbstractOperationPrototype.prototype.getSecondNumber = function () {
    return this.secondNumber;
  };

  AbstractOperationPrototype.prototype.setSecondNumber = function (
    secondNumber
  ) {
    this.secondNumber = secondNumber;
  };

  AbstractOperationPrototype.prototype.print = function (result) {
    console.log(result);
  };

  AbstractOperationPrototype.prototype.operate = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var operator = this.getOperator();

    var answer = this.getAnswer(firstNumber, secondNumber);

    var result = firstNumber + operator + secondNumber + ' = ' + answer;

    this.print(result);
  };

  AbstractOperationPrototype.prototype.toString = function () {
    return 'AbstractOperationPrototype';
  };

  return AbstractOperationPrototype;
})();
