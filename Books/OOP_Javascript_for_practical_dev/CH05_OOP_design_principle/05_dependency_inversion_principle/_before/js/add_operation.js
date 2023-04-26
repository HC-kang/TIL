CALC.createNameSpace('CALC.dip.before.AddOperation');

CALC.dip.before.AddOperation = (function () {
  var AddOperation;

  AddOperation = function () {};

  AddOperation.prototype.add = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperation.prototype.toString = function () {
    return 'Addition';
  };

  return AddOperation;
})();
