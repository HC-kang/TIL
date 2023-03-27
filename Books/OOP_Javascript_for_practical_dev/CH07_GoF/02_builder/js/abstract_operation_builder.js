CALC.createNameSpace('CALC.builder.AbstractOperationBuilder');

CALC.builder.AbstractOperationBuilder = (function () {
  var AbstractOperationBuilder;

  AbstractOperationBuilder = function (firstNumber, secondNumber) {
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;

    this.result = '';
  };

  AbstractOperationBuilder.prototype.operate = function () {
    throw new Error('You have to implement the method operate!');
  };

  AbstractOperationBuilder.prototype.toString = function () {
    return (
      'AbstractOperationBuilder' + this.firstNumber + ' ' + this.secondNumber
    );
  };

  AbstractOperationBuilder.prototype.getResult = function () {
    return this.result;
  };

  AbstractOperationBuilder.prototype.buildFirstNumber = function () {
    this.result += this.firstNumber;
  };

  AbstractOperationBuilder.prototype.buildSecondNumber = function () {
    this.result += this.secondNumber;
  };

  AbstractOperationBuilder.prototype.buildAnswer = function () {
    var answer = this.operate(this.firstNumber, this.secondNumber);

    this.result += ' = ' + answer;
  };

  AbstractOperationBuilder.prototype.buildOperator = function () {
    throw new Error('You have to implement the method buildOperator!');
  };

  return AbstractOperationBuilder;
})();
