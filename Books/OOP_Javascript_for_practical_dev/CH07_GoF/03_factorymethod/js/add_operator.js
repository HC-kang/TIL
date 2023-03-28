CALC.createNameSpace('CALC.factorymethod.AddOperation');

CALC.factorymethod.AddOperator = (function () {
  var AbstractOperator = CALC.factorymethod.AbstractOperator;

  var AddOperator;

  AddOperator = function () {
    AbstractOperator.call(this);
  };

  AddOperator.prototype = Object.create(AbstractOperator.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: AddOperator,
    },
  });

  AddOperator.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperator.prototype.getDescription = function () {
    return '+';
  };

  AddOperator.prototype.toString = function () {
    return 'AddOperator';
  };

  return AddOperator;
})();
