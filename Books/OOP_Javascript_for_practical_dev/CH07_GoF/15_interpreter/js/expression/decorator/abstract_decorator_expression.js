CALC.createNameSpace(
  'CALC.interpreter.expression.decorator.AbstractDecoratorExpression'
);

CALC.interpreter.expression.decorator.AbstractDecoratorExpression =
  (function () {
    var AbstractFunctionExpression =
      CALC.interpreter.expression.AbstractFunctionExpression;

    var CalcExpressionFactory =
      CALC.interpreter.expression.CalcExpressionFactory;

    var AbstractDecoratorExpression;

    AbstractDecoratorExpression = function (expression) {
      AbstractFunctionExpression.call(this);

      this.expression = expression;
    };

    AbstractDecoratorExpression.prototype = Object.create(
      AbstractFunctionExpression.prototype,
      {
        constructor: {
          configurable: true,
          enumerable: true,
          writable: true,
          value: AbstractDecoratorExpression,
        },
      }
    );

    AbstractDecoratorExpression.prototype.setExpression = function (
      expression
    ) {
      this.expression = expression;
    };

    AbstractDecoratorExpression.prototype.parse = function (context) {
      context.skipToken(this.getFunctionName());

      context.getCurrentTokenAndGoToNext();

      context.skipToken('(');

      var currentToken = context.getCurrentTokenAndGoToNext();

      var expression = CalcExpressionFactory.createExpression(currentToken);
      expression.parse(context);

      this.setExpression(expression);

      context.getCurrentTokenAndGoToNext();
      context.skipToken(')');
    };

    AbstractDecoratorExpression.prototype.toString = function () {
      return 'AbstractDecoratorExpression';
    };

    return AbstractDecoratorExpression;
  })();
