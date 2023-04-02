CALC.createNameSpace('CALC.composite.DivideOperationExpression');

CALC.composite.DivideOperationExpression = (function () {
  var AbstractOperationExpression = CALC.composite.AbstractOperationExpression;

  var DivideOperationExpression;

  DivideOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  DivideOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationExpression,
      },
    }
  );

  DivideOperationExpression.prototype.operate = function () {
    var firstOperandExpression = this.operandList[0];
    var secondOperandExpression = this.operandList[1];

    var firstResult = firstOperandExpression.operate();
    var secondResult = secondOperandExpression.operate();

    return firstResult / secondResult;
  };

  DivideOperationExpression.prototype.toString = function () {
    return 'DivideOperationExpression';
  };

  return DivideOperationExpression;
})();
