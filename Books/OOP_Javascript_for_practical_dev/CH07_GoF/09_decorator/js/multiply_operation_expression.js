CALC.createNameSpace('CALC.decorator.MultiplyOperationExpression');

CALC.decorator.MultiplyOperationExpression = (function () {
  var AbstractOperationExpression = CALC.decorator.AbstractOperationExpression;

  var MultiplyOperationExpression;

  MultiplyOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  MultiplyOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
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

  MultiplyOperationExpression.prototype.toString = function () {
    return 'MultiplyOperationExpression';
  };

  return MultiplyOperationExpression;
})();
