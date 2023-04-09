CALC.createNameSpace('CALC.chain.AddOperationHandler');

CALC.chain.AddOperationHandler = (function () {
  var AbstractOperationHandler = CALC.chain.AbstractOperationHandler;

  var AddOperationHandler;

  AddOperationHandler = function (operator) {
    AbstractOperationHandler.call(this, operator);
  };

  AddOperationHandler.prototype = Object.create(
    AbstractOperationHandler.prototype,
    {
      constructor: {
        enumerable: false,
        writable: true,
        configurable: true,
        value: AddOperationHandler,
      },
    }
  );

  AddOperationHandler.prototype.operate = function (request) {
    var operator = this.getOperator();

    var firstNumber = request.getFirstNumber(operator);
    var secondNumber = request.getSecondNumber(operator);

    return firstNumber + secondNumber;
  };

  AddOperationHandler.prototype.toString = function () {
    return 'AddOperationHandler';
  };

  return AddOperationHandler;
})();
