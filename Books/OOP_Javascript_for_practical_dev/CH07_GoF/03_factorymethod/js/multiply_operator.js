CALC.createNameSpace('CALC.factorymethod.MultiplyOperator');

CALC.factorymethod.MultiplyOperator = (function () {
  var AbstractOperator = CALC.factorymethod.AbstractOperator;

  var MultiplyOperator;

  MultiplyOperator = function () {
    AbstractOperator.call(this);
  };

  MultiplyOperator.prototype = Object.create(AbstractOperator.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: MultiplyOperator,
    },
  });

  MultiplyOperator.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperator.prototype.getDescription = function () {
    return '*';
  };

  MultiplyOperator.prototype.toString = function () {
    return 'MultiplyOperator';
  };

  return MultiplyOperator;
})();
