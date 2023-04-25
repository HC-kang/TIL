CALC.createNameSpace('CALC.isp.after.CalcClient');

CALC.isp.after.CalcClient = (function () {
  var CalcClient;

  CalcClient = function () {};

  CalcClient.prototype.request = function (
    calculator,
    operation,
    firstNumber,
    secondNumber
  ) {
    calculator.setOperation(operation);

    var answer = calculator.calculate(firstNumber, secondNumber);

    return answer;
  };

  CalcClient.prototype.toString = function () {
    return 'CalcClient';
  };

  return CalcClient;
})();
