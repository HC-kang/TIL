CALC.createNameSpace(
  'CALC.interpreter.expression.decorator.SqrtDecoratorExpression'
);

CALC.interpreter.expression.decorator.SqrtDecoratorExpression = (function () {
  var AbstractDecoratorExpression =
    CALC.interpreter.expression.decorator.AbstractDecoratorExpression;

  var SqrtDecoratorExpression;

  SqrtDecoratorExpression = function (expression) {
    AbstractDecoratorExpression.call(this, expression);
  };

  SqrtDecoratorExpression.prototype = Object.create(
    AbstractDecoratorExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SqrtDecoratorExpression,
      },
    }
  );

  SqrtDecoratorExpression.prototype.operate = function () {
    return Math.sqrt(this.expression.operate());
  };

  SqrtDecoratorExpression.prototype.getFunctionName = function () {
    return 'SQRT';
  };

  SqrtDecoratorExpression.prototype.toString = function () {
    return 'SqrtDecoratorExpression';
  };

  return SqrtDecoratorExpression;
})();
