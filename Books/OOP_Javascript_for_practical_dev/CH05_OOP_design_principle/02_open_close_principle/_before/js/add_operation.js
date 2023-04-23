CALC.createNameSpace('CALC.ocp.before.AddOperation');

CALC.ocp.before.AddOperation = (function () {
  var AddOperation;

  AddOperation = function () {};

  AddOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
