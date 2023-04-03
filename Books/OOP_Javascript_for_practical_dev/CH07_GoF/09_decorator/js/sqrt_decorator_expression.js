CALC.createNameSpace('CALC.decorator.SqrtDecoratorExpression');

CALC.decorator.SqrtDecoratorExpression = (function () {
  var AbstractDecoratorExpression = CALC.decorator.AbstractDecoratorExpression;

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

  SqrtDecoratorExpression.prototype.toString = function () {
    return 'SqrtDecoratorExpression';
  };

  return SqrtDecoratorExpression;
})();
