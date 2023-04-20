CALC.createNameSpace('CALC.visitor.expression.AbstractOperationExpression');

CALC.visitor.expression.AbstractOperationExpression = (function () {
  var AbstractExpression = CALC.visitor.expression.AbstractExpression;

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

  AbstractOperationExpression.prototype.accept = function (v) {
    for (var i = 0; i < this.operandList.length; i++) {
      var operandExpression = this.operandList[i];

      operandExpression.accept(v);
    }
  };

  AbstractOperationExpression.prototype.toString = function () {
    return 'AbstractOperationExpression';
  };

  return AbstractOperationExpression;
})();
