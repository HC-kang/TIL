CALC.createNameSpace(
  'CALC.interpreter.expression.decorator.PowDecoratorExpression'
);

CALC.interpreter.expression.decorator.PowDecoratorExpression = (function () {
  var AbstractDecoratorExpression =
    CALC.interpreter.expression.decorator.AbstractDecoratorExpression;

  var PowDecoratorExpression;

  PowDecoratorExpression = function (expression, exponent) {
    AbstractDecoratorExpression.call(this, expression);

    this.exponent = exponent;
  };

  PowDecoratorExpression.prototype = Object.create(
    AbstractDecoratorExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: PowDecoratorExpression,
      },
    }
  );

  PowDecoratorExpression.prototype.operate = function () {
    return Math.pow(this.expression.operate(), this.exponent);
  };

  PowDecoratorExpression.prototype.getFunctionName = function () {
    return 'POW';
  };

  PowDecoratorExpression.prototype.toString = function () {
    return 'PowDecoratorExpression';
  };

  return PowDecoratorExpression;
})();
