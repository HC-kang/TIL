CALC.createNameSpace('CALC.isp.after.DisplayClient');

CALC.isp.after.DisplayClient = (function () {
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
