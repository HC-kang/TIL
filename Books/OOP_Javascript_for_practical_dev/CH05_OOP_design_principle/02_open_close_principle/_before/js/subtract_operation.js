CALC.createNameSpace('CALC.ocp.before.SubtractOperation');

CALC.ocp.before.SubtractOperation = (function () {
  var SubtractOperation;

  SubtractOperation = function () {};

  SubtractOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperation.prototype.toString = function () {
    return 'SUbtractOperation';
  };

  return SubtractOperation;
})();
