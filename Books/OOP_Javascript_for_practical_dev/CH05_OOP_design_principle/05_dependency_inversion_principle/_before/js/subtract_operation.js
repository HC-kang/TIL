CALC.createNameSpace('CALC.dip.before.SubtractOperation');

CALC.dip.before.SubtractOperation = (function () {
  var SubtractOperation;

  SubtractOperation = function () {};

  SubtractOperation.prototype.subtract = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  }

  SubtractOperation.prototype.toString = function () {
    return 'Subtraction';
  }

  return SubtractOperation;
})();