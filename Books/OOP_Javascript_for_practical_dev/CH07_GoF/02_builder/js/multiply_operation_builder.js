CALC.createNameSpace('CALC.builder.MultiplyOperationBuilder');

CALC.builder.MultiplyOperationBuilder = (function () {
  var AbstractOperationBuilder = CALC.builder.AbstractOperationBuilder;

  var MultiplyOperationBuilder;

  MultiplyOperationBuilder = function (firstNumber, secondNumber) {
    AbstractOperationBuilder.call(this, firstNumber, secondNumber);
  };

  MultiplyOperationBuilder.prototype = Object.create(
    AbstractOperationBuilder.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MultiplyOperationBuilder,
      },
    }
  );

  MultiplyOperationBuilder.prototype.operate = function () {
    return this.firstNumber * this.secondNumber;
  };

  MultiplyOperationBuilder.prototype.toString = function () {
    return (
      'MultiplyOperationBuilder ' + this.firstNumber + ' ' + this.secondNumber
    );
  };

  MultiplyOperationBuilder.prototype.buildOperator = function () {
    this.result += ' * ';
  };

  return MultiplyOperationBuilder;
})();
