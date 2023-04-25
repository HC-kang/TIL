CALC.createNameSpace('CALC.lsp.before.Calculator');

CALC.lsp.before.Calculator = (function () {
  var Calculator;

  Calculator = function () {};

  Calculator.prototype.calculate = function (
    operation,
    firstNumber,
    secondNumber
  ) {
    if (operation instanceof CALC.lsp.before.DivideOperation) {
      if (secondNumber === 0) {
        return -999;
      }
    }
    var answer = operation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
