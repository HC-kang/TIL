CALC.createNameSpace('CALC.dip.before.DivideOperation');

CALC.dip.before.DivideOperation = (function () {
  var DivideOperation;

  DivideOperation = function () {};

  DivideOperation.prototype.divide = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.toString = function () {
    return 'DivisionOperation';
  };

  return DivideOperation;
})();
