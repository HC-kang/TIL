CALC.createNameSpace('CALC.factorymethod.SubtractOperator');

CALC.factorymethod.SubtractOperator = (function () {
  var AbstractOperator = CALC.factorymethod.AbstractOperator;

  var SubtractOperator;

  SubtractOperator = function () {
    AbstractOperator.call(this);
  };

  SubtractOperator.prototype = Object.create(AbstractOperator.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: SubtractOperator,
    },
  });

  SubtractOperator.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperator.prototype.getDescription = function () {
    return '-';
  };

  SubtractOperator.prototype.toString = function () {
    return 'SubtractOperator';
  };

  return SubtractOperator;
})();
