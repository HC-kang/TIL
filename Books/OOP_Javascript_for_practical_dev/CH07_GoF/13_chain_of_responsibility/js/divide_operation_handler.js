CALC.createNameSpace('CALC.chain.DivideOperationHandler');

CALC.chain.DivideOperationHandler = (function () {
  var AbstractOperationHandler = CALC.chain.AbstractOperationHandler;

  var DivideOperationHandler;

  DivideOperationHandler = function (operator) {
    AbstractOperationHandler.call(this, operator);
  };

  DivideOperationHandler.prototype = Object.create(
    AbstractOperationHandler.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationHandler,
      },
    }
  );

  DivideOperationHandler.prototype.operate = function (request) {
    var operator = this.getOperator();

    var firstNumber = request.getFirstNumber(operator);
    var secondNumber = request.getSecondNumber(operator);

    return firstNumber / secondNumber;
  };

  DivideOperationHandler.prototype.toString = function () {
    return 'DivideOperationHandler';
  };

  return DivideOperationHandler;
})();
