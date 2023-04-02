CALC.createNameSpace('CALC.composite.SubtractOperationExpression');

CALC.composite.SubtractOperationExpression = (function () {
  var AbstractOperationExpression = CALC.composite.AbstractOperationExpression;

  var SubtractOperationExpression;

  SubtractOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  SubtractOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        value: SubtractOperationExpression,
        writable: true,
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

  SubtractOperationExpression.prototype.toString = function () {
    return 'SubtractOperationExpression';
  };

  return SubtractOperationExpression;
})();
