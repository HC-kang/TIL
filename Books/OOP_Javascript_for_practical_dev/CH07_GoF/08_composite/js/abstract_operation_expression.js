CALC.createNameSpace('CALC.composite.AbstractOperationExpression');

CALC.composite.AbstractOperationExpression = (function () {
  var AbstractExpression = CALC.composite.AbstractExpression;

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
        enumerable: false,
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
