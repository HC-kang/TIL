CALC.createNameSpace('CALC.interpreter.expression.CalcExpressionFactory');

CALC.interpreter.expression.CalcExpressionFactory = (function () {
  var CalcExpressionFactory;

  CalcExpressionFactory = function () {};

  CalcExpressionFactory.createExpression = function (calcToken) {
    var CalcToken = CALC.interpreter.CalcToken;

    var NumberExpression = CALC.interpreter.expression.NumberExpression;
    var AddOperationExpression =
      CALC.interpreter.expression.AddOperationExpression;
    var SubtractOperationExpression =
      CALC.interpreter.expression.SubtractOperationExpression;
    var MultiplyOperationExpression =
      CALC.interpreter.expression.MultiplyOperationExpression;
    var DivideOperationExpression =
      CALC.interpreter.expression.DivideOperationExpression;
    var SqrtDecoratorExpression =
      CALC.interpreter.expression.SqrtDecoratorExpression;
    var FracDecoratorExpression =
      CALC.interpreter.expression.FracDecoratorExpression;
    var PowDecoratorExpression =
      CALC.interpreter.expression.PowDecoratorExpression;

    var expression = null;

    if (calcToken != null) {
      if (calcToken.getType() === CalcToken.NUMBER) {
        expression = new NumberExpression(parseInt(calcToken.getToken(), 10));
      } else if (calcToken.getType() === CalcToken.FUNCTION) {
        if (calcToken.getToken() === 'SQRT') {
          expression = new SqrtDecoratorExpression();
        } else if (calcToken.getToken() === 'FRAC') {
          expression = new FracDecoratorExpression();
        } else if (calcToken.getToken() === 'POW') {
          expression = new PowDecoratorExpression();
        } else if (calcToken.getToken() === 'ADD') {
          expression = new AddOperationExpression();
        } else if (calcToken.getToken() === 'SUB') {
          expression = new SubtractOperationExpression();
        } else if (calcToken.getToken() === 'MUL') {
          expression = new MultiplyOperationExpression();
        } else if (calcToken.getToken() === 'DIV') {
          expression = new DivideOperationExpression();
        }
      }
    }

    return expression;
  };

  CalcExpressionFactory.prototype.toString = function () {
    return 'CalcExpressionFactory';
  };

  return CalcExpressionFactory;
})();
