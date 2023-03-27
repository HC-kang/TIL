CALC.createNameSpace('CALC.builder.DivideOperationBuilder');

CALC.builder.DivideOperationBuilder = (function () {
  var AbstractOperationBuilder = CALC.builder.AbstractOperationBuilder;

  var DivideOperationBuilder;

  DivideOperationBuilder = function (firstNumber, secondNumber) {
    AbstractOperationBuilder.call(this, firstNumber, secondNumber);
  };

  DivideOperationBuilder.prototype = Object.create(
    AbstractOperationBuilder.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DivideOperationBuilder,
      },
    }
  );

  DivideOperationBuilder.prototype.operate = function () {
    return this.firstNumber / this.secondNumber;
  };

  DivideOperationBuilder.prototype.toString = function () {
    return (
      'DivideOperationBuilder ' + this.firstNumber + ' ' + this.secondNumber
    );
  };

  DivideOperationBuilder.prototype.buildOperator = function () {
    this.result += ' / ';
  };

  return DivideOperationBuilder;
})();
