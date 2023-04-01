CALC.createNameSpace('CALC.adapter.DivideOperationAdapter');

CALC.adapter.DivideOperationAdapter = (function () {
  var OperationAdaptee = CALC.adapter.OperationAdaptee;
  var AbstractOperationTarget = CALC.adapter.AbstractOperationTarget;

  var DivideOperationAdapter;

  DivideOperationAdapter = function (operationAdaptee) {
    this.operationAdaptee = operationAdaptee;
  };

  DivideOperationAdapter.prototype = Object.create(
    AbstractOperationTarget.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DivideOperationAdapter,
      },
    }
  );

  DivideOperationAdapter.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    return this.operationAdaptee.calculate(
      OperationAdaptee.DIVIDE_OPERATION,
      firstNumber,
      secondNumber
    );
  };

  DivideOperationAdapter.prototype.toString = function () {
    return 'DivideOperationAdapter';
  };

  return DivideOperationAdapter;
})();
