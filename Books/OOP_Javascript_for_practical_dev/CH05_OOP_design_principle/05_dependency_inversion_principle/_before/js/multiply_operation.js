CALC.createNameSpace('CALC.dip.before.MultiplyOperation');

CALC.dip.before.MultiplyOperation = (function () {
  var MultiplyOperation;

  MultiplyOperation = function () {};

  MultiplyOperation.prototype.multiply = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.toString = function () {
    return 'Multiplication';
  };

  return MultiplyOperation;
})();
