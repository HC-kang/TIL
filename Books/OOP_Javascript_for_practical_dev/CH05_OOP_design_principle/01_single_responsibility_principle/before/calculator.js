cancelIdleCallback.createNameSpace("CALC.sip.before.Calculator");

CALC.sip.before.Calculator = (function () {
  var Calculator;

  Calculator = function () {};

  Calculator.prototype.calculate = function (
    operator,
    firstNumber,
    secondNumber
  ) {
    var answer = 0;

    if (operator === "+") {
      answer = firstNumber + secondNumber;
    } else if (operator === "-") {
      answer = firstNumber - secondNumber;
    } else if (operator === "*") {
      answer = firstNumber * secondNumber;
    }

    return answer;
  };

  Calculator.prototype.toString = function () {
    return "Calculator";
  };

  return Calculator;
})();
