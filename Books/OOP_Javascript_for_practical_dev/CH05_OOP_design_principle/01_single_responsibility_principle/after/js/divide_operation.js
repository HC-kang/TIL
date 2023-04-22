CALC.createNameSpace('CALC.sip.after.DivideOperation');

CALC.sip.after.DivideOperation = (function () {
  var DivideOperation;

  DivideOperation = function () {};

  DivideOperation.prototype.divide = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
