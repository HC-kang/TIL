CALC.createNameSpace('CALC.interpreter.expression.AbstractFunctionExpression');

CALC.interpreter.expression.AbstractFunctionExpression = (function () {
  var AbstractExpression = CALC.interpreter.AbstractExpression;

  var AbstractFunctionExpression;

  AbstractFunctionExpression = function () {
    AbstractExpression.call(this);
  };

  AbstractFunctionExpression.prototype = Object.create(
    AbstractExpression.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AbstractFunctionExpression,
      },
    }
  );

  AbstractFunctionExpression.prototype.getFunctionName = function () {
    throw new Error('You have to implement the method getFunctionName()');
  };

  AbstractFunctionExpression.prototype.toString = function () {
    return 'AbstractFunctionExpression';
  };

  return AbstractFunctionExpression;
})();
