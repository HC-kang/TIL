CALC.createNameSpace('CALC.sip.after.AddOperation');

CALC.sip.after.AddOperation = (function () {
  var AddOperation;

  AddOperation = function () {};

  AddOperation.prototype.add = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
