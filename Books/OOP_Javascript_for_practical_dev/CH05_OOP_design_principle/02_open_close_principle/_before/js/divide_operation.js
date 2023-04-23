CALC.createNameSpace('CALC.ocp.before.DivideOperation');

CALC.ocp.before.DivideOperation = (function () {
  var DivideOperation;

  DivideOperation = function () {};

  DivideOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
