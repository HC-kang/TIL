CALC.createNameSpace('CALC.builder.AddOperationBuilder');

CALC.builder.AddOperationBuilder = (function () {
  var AbstractOperationBuilder = CALC.builder.AbstractOperationBuilder;

  var AddOperationBuilder;

  AddOperationBuilder = function (firstNumber, secondNumber) {
    AbstractOperationBuilder.call(this, firstNumber, secondNumber);
  };

  AddOperationBuilder.prototype = Object.create(
    AbstractOperationBuilder.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        value: AddOperationBuilder,
        writable: true,
      },
    }
  );

  AddOperationBuilder.prototype.operate = function () {
    return this.firstNumber + this.secondNumber;
  };

  AddOperationBuilder.prototype.toString = function () {
    return 'AddOperationBuilder' + this.firstNumber + ' ' + this.secondNumber;
  };

  AddOperationBuilder.prototype.buildOperator = function () {
    this.result += ' + ';
  };

  return AddOperationBuilder;
})();
