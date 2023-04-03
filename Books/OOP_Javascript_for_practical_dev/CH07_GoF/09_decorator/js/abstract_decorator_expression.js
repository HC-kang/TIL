CALC.createNameSpace('CALC.decorator.AbstractDecoratorExpression');

CALC.decorator.AbstractDecoratorExpression = (function () {
  var AbstractExpression = CALC.decorator.AbstractExpression;

  var AbstractDecoratorExpression;

  AbstractDecoratorExpression = function (expression) {
    AbstractExpression.call(this);

    this.expression = expression;
  };

  AbstractDecoratorExpression.prototype = Object.create(
    AbstractExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AbstractDecoratorExpression,
      },
    }
  );

  AbstractDecoratorExpression.prototype.setExpression = function (expression) {
    this.expression = expression;
  };

  AbstractDecoratorExpression.prototype.toString = function () {
    return 'AbstractDecoratorExpression';
  };

  return AbstractDecoratorExpression;
})();
