CALC.createNameSpace('CALC.visitor.expression.VariableExpression');

CALC.visitor.expression.VariableExpression = (function () {
  var AbstractExpression = CALC.visitor.expression.AbstractExpression;

  var VariableExpression;

  VariableExpression = function (name) {
    AbstractExpression.call(this);

    this.name = name;
    this.value = 0;
  };

  VariableExpression.prototype = Object.create(AbstractExpression.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: VariableExpression,
    },
  });

  VariableExpression.prototype.operate = function () {
    return this.value;
  };

  VariableExpression.prototype.accept = function (v) {
    v.visit(this);
  };

  VariableExpression.prototype.getName = function () {
    return this.name;
  };

  VariableExpression.prototype.setValue = function (value) {
    this.value = value;
  };

  VariableExpression.prototype.toString = function () {
    return 'VariableExpression';
  };

  return VariableExpression;
})();
