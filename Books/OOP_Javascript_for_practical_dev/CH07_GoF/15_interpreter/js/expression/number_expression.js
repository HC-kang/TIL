CALC.createNameSpace('CALC.interpreter.expression.NumberExpression');

CALC.interpreter.expression.NumberExpression = (function () {
  var AbstractExpression = CALC.interpreter.expression.AbstractExpression;

  var NumberExpression;

  NumberExpression = function (value) {
    AbstractExpression.call(this);

    this.value = value;
  };

  NumberExpression.prototype = Object.create(AbstractExpression.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: NumberExpression,
    },
  });

  NumberExpression.prototype.operate = function () {
    return this.value;
  };

  NumberExpression.prototype.parse = function (context) {};

  NumberExpression.prototype.toString = function () {
    return 'NumberExpression';
  };

  return NumberExpression;
})();
