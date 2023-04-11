CALC.createNameSpace('CALC.interpreter.expression.AbstractOperationExpression');

CALC.interpreter.expression.AbstractOperationExpression = (function () {
  var AbstractFunctionExpression =
    CALC.interpreter.expression.AbstractFunctionExpression;

  var AbstractOperationExpression;

  AbstractOperationExpression = function () {
    AbstractFunctionExpression.call(this);

    this.operandList = [];
  };

  AbstractOperationExpression.prototype = Object.create(
    AbstractFunctionExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AbstractOperationExpression,
      },
    }
  );

  AbstractOperationExpression.prototype.operate = function () {
    throw new Error('You have to implement the method operate');
  };

  AbstractOperationExpression.prototype.addOperandExpression = function (
    operandExpression
  ) {
    this.operandList.push(operandExpression);
  };

  AbstractOperationExpression.prototype.parse = function (context) {
    var CalcExpressionFactory =
      CALC.interpreter.expression.CalcExpressionFactory;

    context.skipToken(this.getFunctionName());

    context.getCurrentTokenAndGoToNext();
    context.skipToken('(');

    var currentToken = context.getCurrentTokenAndGoToNext();

    var operandExpression =
      CalcExpressionFactory.createExpression(currentToken);
    operandExpression.parse(context);

    this.addOperandExpression(operandExpression);

    context.getCurrentTokenAndGoToNext();
    context.skipToken(',');

    currentToken = context.getCurrentTokenAndGoToNext();

    operandExpression = CalcExpressionFactory.createExpression(currentToken);
    operandExpression.parse(context);

    this.addOperandExpression(operandExpression);

    context.getCurrentTokenAndGoToNext();
    context.skipToken(')');
  };

  AbstractOperationExpression.prototype.toString = function () {
    return 'AbstractOperationExpression';
  };

  return AbstractOperationExpression;
})();
