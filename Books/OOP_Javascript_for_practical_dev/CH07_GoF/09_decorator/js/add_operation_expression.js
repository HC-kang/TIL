CALC.createNameSpace('CALC.decorator.AddOperationExpression');

CALC.decorator.AddOperationExpression = (function () {
  var AbstractOperationExpression = CALC.decorator.AbstractOperationExpression;

  var AddOperationExpression;

  AddOperationExpression = function () {
    AbstractOperationExpression.call(this);
  };

  AddOperationExpression.prototype = Object.create(
    AbstractOperationExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AddOperationExpression,
      },
    }
  );

  AddOperationExpression.prototype.operate = function () {
    var firstOperandExpression = this.operandList[0];
    var secondOperandExpression = this.operandList[1];

    var firstResult = firstOperandExpression.operate();
    var secondResult = secondOperandExpression.operate();

    return firstResult + secondResult;
  };

  AddOperationExpression.prototype.toString = function () {
    return 'AddOperationExpression';
  };

  return AddOperationExpression;
})();
