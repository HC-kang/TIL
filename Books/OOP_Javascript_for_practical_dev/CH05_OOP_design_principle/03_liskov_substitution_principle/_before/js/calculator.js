CALC.createNameSpace('CALC.lsp.before.Calculator');

CALC.lsp.before.Calculator = (function () {
  var Calculator;

  Calculator = function () {};

  Calculator.prototype.calculate = function (
    operation,
    firstNumber,
    secondNumber
  ) {
    var answer = operation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
