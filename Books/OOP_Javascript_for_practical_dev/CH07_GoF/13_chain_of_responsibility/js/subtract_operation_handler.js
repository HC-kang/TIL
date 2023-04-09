CALC.createNameSpace('CALC.chain.SubtractOperationHandler');

CALC.chain.SubtractOperationHandler = (function () {
  var AbstractOperationHandler = CALC.chain.AbstractOperationHandler;

  var SubtractOperationHandler;

  SubtractOperationHandler = function (operator) {
    AbstractOperationHandler.call(this, operator);
  };

  SubtractOperationHandler.prototype = Object.create(
    AbstractOperationHandler.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubtractOperationHandler,
      },
    }
  );

  SubtractOperationHandler.prototype.operate = function (request) {
    var operator = this.getOperator();

    var firstNumber = request.getFirstNumber(operator);
    var secondNumber = request.getSecondNumber(operator);

    return firstNumber - secondNumber;
  };

  SubtractOperationHandler.prototype.toString = function () {
    return 'SubtractOperationHandler';
  };

  return SubtractOperationHandler;
})();
