CALC.createNameSpace('CALC.chain.MultiplyOperationHandler');

CALC.chain.MultiplyOperationHandler = (function () {
  var AbstractOperationHandler = CALC.chain.AbstractOperationHandler;

  var MultiplyOperationHandler;

  MultiplyOperationHandler = function (operator) {
    AbstractOperationHandler.call(this, operator);
  };

  MultiplyOperationHandler.prototype = Object.create(
    AbstractOperationHandler.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: MultiplyOperationHandler,
      },
    }
  );

  MultiplyOperationHandler.prototype.operate = function (request) {
    var operator = this.getOperator();

    var firstNumber = request.getFirstNumber(operator);
    var secondNumber = request.getSecondNumber(operator);

    return firstNumber * secondNumber;
  };

  MultiplyOperationHandler.prototype.toString = function () {
    return 'MultiplyOperationHandler';
  };

  return MultiplyOperationHandler;
})();
