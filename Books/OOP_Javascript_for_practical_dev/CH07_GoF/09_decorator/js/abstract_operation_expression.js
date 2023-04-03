CALC.createNameSpace('CALC.decorator.AbstractOperationExpression');

CALC.decorator.AbstractOperationExpression = (function () {
  var AbstractExpression = CALC.decorator.AbstractExpression;

  var AbstractOperationExpression;

  AbstractOperationExpression = function () {
    AbstractExpression.call(this);

    this.operandList = [];
  };

  AbstractOperationExpression.prototype = Object.create(
    AbstractExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AbstractOperationExpression,
      },
    }
  );

  AbstractOperationExpression.prototype.addOperandExpression = function (
    operandExpression
  ) {
    this.operandList.push(operandExpression);
  };

  AbstractOperationExpression.prototype.toString = function () {
    return 'AbstractOperationExpression';
  };

  return AbstractOperationExpression;
})();
