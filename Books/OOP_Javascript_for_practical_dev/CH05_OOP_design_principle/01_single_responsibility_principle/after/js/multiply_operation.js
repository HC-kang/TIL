CALC.createNameSpace('CALC.sip.after.MultiplyOperation');

CALC.sip.after.MultiplyOperation = (function () {
  var MultiplyOperation;

  MultiplyOperation = function () {};

  MultiplyOperation.prototype.multiply = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
