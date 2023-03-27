CALC.createNameSpace('CALC.builder.SubtractOperationBuilder');

CALC.builder.SubtractOperationBuilder = (function () {
  var AbstractOperationBuilder = CALC.builder.AbstractOperationBuilder;

  var SubtractOperationBuilder;

  SubtractOperationBuilder = function (firstNumber, secondNumber) {
    AbstractOperationBuilder.call(this, firstNumber, secondNumber);
  };

  SubtractOperationBuilder.prototype = Object.create(
    AbstractOperationBuilder.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SubtractOperationBuilder,
      },
    }
  );

  SubtractOperationBuilder.prototype.operate = function () {
    return this.firstNumber - this.secondNumber;
  };

  SubtractOperationBuilder.prototype.toString = function () {
    return (
      'SubtractOperationBuilder ' + this.firstNumber + ' ' + this.secondNumber
    );
  };

  SubtractOperationBuilder.prototype.buildOperator = function () {
    this.result += ' - ';
  };

  return SubtractOperationBuilder;
})();
