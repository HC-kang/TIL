CALC.createNameSpace('CALC.visitor.Calculator');

CALC.visitor.Calculator = (function () {
  var SetValueToVariableVisitor = CALC.visitor.SetValueToVariableVisitor;

  var Calculator;

  Calculator = function () {
    this.expression = null;
    this.variableToValueMap = {};
  };

  Calculator.prototype.calculate = function () {
    if (this.expression != null) {
      for (var variableName in this.variableToValueMap) {
        if (!this.variableToValueMap.hasOwnProperty(variableName)) {
          continue;
        }

        var value = this.variableToValueMap[variableName];

        var setValueToVariableVisitor = new SetValueToVariableVisitor(
          variableName,
          value
        );

        this.expression.accept(setValueToVariableVisitor);
      }

      return this.expression.operate();
    }

    return 0;
  };

  Calculator.prototype.setExpression = function (expression) {
    this.expression = expression;
  };

  Calculator.prototype.addVariableToValue = function (variableName, value) {
    this.variableToValueMap[variableName] = value;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();

