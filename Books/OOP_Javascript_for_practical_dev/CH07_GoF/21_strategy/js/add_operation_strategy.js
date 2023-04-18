CALC.createNameSpace('CALC.strategy.AddOperationStrategy');

CALC.strategy.AddOperationStrategy = (function () {
  var AbstractOperationStrategy = CALC.strategy.AbstractOperationStrategy;

  var AddOperationStrategy;

  AddOperationStrategy = function () {
    AbstractOperationStrategy.call(this);
  };

  AddOperationStrategy.prototype = Object.create(
    AbstractOperationStrategy.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: AddOperationStrategy,
      },
    }
  );

  AddOperationStrategy.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber + secondNumber;
  };

  AddOperationStrategy.prototype.getOperator = function () {
    return ' + ';
  };

  AddOperationStrategy.prototype.toString = function () {
    return 'AddOperationStrategy';
  };

  return AddOperationStrategy;
})();
