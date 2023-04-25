CALC.createNameSpace('CALC.lsp.after.Calculator');

CALC.lsp.after.Calculator = (function () {
  var Calculator;

  Calculator = function () {};

  Calculator.prototype.calculate = function (
    operation,
    firstNumber,
    secondNumber
  ) {
    if (operation.isInvalidNumber(firstNumber, secondNumber)) {
      return -999;
    }

    var answer = operation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
