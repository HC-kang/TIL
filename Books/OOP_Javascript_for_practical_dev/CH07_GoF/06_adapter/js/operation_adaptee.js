CALC.createNameSpace('CALC.adapter.OperationAdaptee');

CALC.adapter.OperationAdaptee = (function () {
  var OperationAdaptee;

  OperationAdaptee = function (impl) {};

  OperationAdaptee.ADD_OPERATION = 1;
  OperationAdaptee.SUBTRACT_OPERATION = 2;
  OperationAdaptee.MULTIPLY_OPERATION = 3;
  OperationAdaptee.DIVIDE_OPERATION = 4;

  OperationAdaptee.prototype.calculate = function (
    operationType,
    firstNumber,
    secondNumber
  ) {
    switch (operationType) {
      case OperationAdaptee.ADD_OPERATION:
        return firstNumber + secondNumber;
      case OperationAdaptee.SUBTRACT_OPERATION:
        return firstNumber - secondNumber;
      case OperationAdaptee.MULTIPLY_OPERATION:
        return firstNumber * secondNumber;
      case OperationAdaptee.DIVIDE_OPERATION:
        return firstNumber / secondNumber;
    }
    return 0;
  };

  OperationAdaptee.prototype.toString = function () {
    return 'OperationAdaptee';
  };

  return OperationAdaptee;
})();
