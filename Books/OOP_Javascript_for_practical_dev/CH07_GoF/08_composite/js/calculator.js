CALC.createNameSpace('CALC.composite.Calculator');

CALC.composite.Calculator = (function () {
  var Calculator;

  Calculator = function () {
    this.expression = null;
  };

  Calculator.prototype.calculate = function () {
    return this.expression.operate();
  };

  Calculator.prototype.setExpression = function (expression) {
    this.expression = expression;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
