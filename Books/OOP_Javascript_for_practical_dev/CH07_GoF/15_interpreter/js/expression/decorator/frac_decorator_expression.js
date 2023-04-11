CALC.createNameSpace(
  'CALC.interpreter.expression.decorator.FracDecoratorExpression'
);

CALC.interpreter.expression.decorator.FracDecoratorExpression = (function () {
  var AbstractDecoratorExpression =
    CALC.interpreter.expression.decorator.AbstractDecoratorExpression;

  var FracDecoratorExpression;

  FracDecoratorExpression = function (expression) {
    AbstractDecoratorExpression.call(this, expression);
  };

  FracDecoratorExpression.prototype = Object.create(
    AbstractDecoratorExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: FracDecoratorExpression,
      },
    }
  );

  FracDecoratorExpression.prototype.operate = function () {
    return 1 / this.expression.operate();
  };

  FracDecoratorExpression.prototype.getFunctionName = function () {
    return 'FRAC';
  };

  FracDecoratorExpression.prototype.toString = function () {
    return 'FracDecoratorExpression';
  };

  return FracDecoratorExpression;
})();
