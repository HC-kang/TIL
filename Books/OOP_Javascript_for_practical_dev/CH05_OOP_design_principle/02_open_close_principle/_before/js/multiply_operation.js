CALC.createNameSpace('CALC.ocp.before.MultiplyOperation');

CALC.ocp.before.MultiplyOperation = (function () {
  var MultiplyOperation;

  MultiplyOperation = function () {};

  MultiplyOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
