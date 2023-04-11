CALC.createNameSpace('CALC.interpreter.expression.SubtractOperationExpression');

CALC.interpreter.expression.SubtractOperationExpression = (function () {
  var AbstractOperationExpression =
    CALC.interpreter.expression.AbstractOperationExpression;

  var SubtractOperationExpression;

  SubtractOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  SubtractOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubtractOperationExpression,
      },
    }
  );

  SubtractOperationExpression.prototype.operate = function () {
    var firstOperandExpression = this.operandList[0];
    var secondOperandExpression = this.operandList[1];

    var firstResult = firstOperandExpression.operate();
    var secondResult = secondOperandExpression.operate();

    return firstResult - secondResult;
  };

  SubtractOperationExpression.prototype.getFunctionName = function () {
    return 'SUB';
  };

  SubtractOperationExpression.prototype.toString = function () {
    return 'SubtractOperationExpression';
  };

  return SubtractOperationExpression;
})();
