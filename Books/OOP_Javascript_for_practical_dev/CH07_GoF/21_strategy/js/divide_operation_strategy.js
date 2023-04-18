CALC.createNameSpace('CALC.strategy.DivideOperationStrategy');

CALC.strategy.DivideOperationStrategy = (function () {
  var AbstractOperationStrategy = CALC.strategy.AbstractOperationStrategy;

  var DivideOperationStrategy;

  DivideOperationStrategy = function () {
    AbstractOperationStrategy.call(this);
  };

  DivideOperationStrategy.prototype = Object.create(
    AbstractOperationStrategy.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationStrategy,
      },
    }
  );

  DivideOperationStrategy.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber / secondNumber;
  };

  DivideOperationStrategy.prototype.getOperator = function () {
    return ' / ';
  };

  DivideOperationStrategy.prototype.toString = function () {
    return 'DivideOperationStrategy';
  };

  return DivideOperationStrategy;
})();
