CALC.createNameSpace('CALC.interpreter.expression.MultiplyOperationExpression');

CALC.interpreter.expression.MultiplyOperationExpression = (function () {
  var AbstractOperationExpression =
    CALC.interpreter.expression.AbstractOperationExpression;

  var MultiplyOperationExpression;

  MultiplyOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  MultiplyOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: MultiplyOperationExpression,
      },
    }
  );

  MultiplyOperationExpression.prototype.operate = function () {
    var firstOperandExpression = this.operandList[0];
    var secondOperandExpression = this.operandList[1];

    var firstResult = firstOperandExpression.operate();
    var secondResult = secondOperandExpression.operate();

    return firstResult * secondResult;
  };

  MultiplyOperationExpression.prototype.getFunctionName = function () {
    return 'MUL';
  };

  MultiplyOperationExpression.prototype.toString = function () {
    return 'MultiplyOperationExpression';
  };

  return MultiplyOperationExpression;
})();
