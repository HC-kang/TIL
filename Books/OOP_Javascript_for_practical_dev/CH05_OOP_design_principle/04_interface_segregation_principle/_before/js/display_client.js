CALC.createNameSpace('CALC.isp.before.DisplayClient');

CALC.isp.before.DisplayClient = (function () {
  var DisplayClient;

  DisplayClient = function () {};

  DisplayClient.prototype.request = function (
    calculator,
    operation,
    firstNumber,
    secondNumber
  ) {
    calculator.display(operation, firstNumber, secondNumber);
  };

  DisplayClient.prototype.toString = function () {
    return 'DisplayClient';
  };

  return DisplayClient;
})();
