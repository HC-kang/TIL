CALC.createNameSpace('CALC.factorymethod.DivideOperator');

CALC.factorymethod.DivideOperator = (function () {
  var AbstractOperator = CALC.factorymethod.AbstractOperator;

  var DivideOperator;

  DivideOperator = function () {
    AbstractOperator.call(this);
  };

  DivideOperator.prototype = Object.create(AbstractOperator.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: DivideOperator,
    },
  });

  DivideOperator.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperator.prototype.getDescription = function () {
    return '/';
  };

  DivideOperator.prototype.toString = function () {
    return 'DivideOperator';
  };

  return DivideOperator;
})();
