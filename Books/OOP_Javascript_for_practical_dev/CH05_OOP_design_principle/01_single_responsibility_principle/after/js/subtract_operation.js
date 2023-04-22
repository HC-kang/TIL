CALC.createNameSpace('CALC.sip.after.SubtractOperation');

CALC.sip.after.SubtractOperation = (function () {
  var SubtractOperation;

  SubtractOperation = function () {};

  SubtractOperation.prototype.subtract = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
