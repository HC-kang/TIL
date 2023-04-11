CALC.createNameSpace('CALC.interpreter.expression.AbstractExpression');

CALC.interpreter.expression.AbstractExpression = (function () {
  var AbstractExpression;

  AbstractExpression = function () {};

  AbstractExpression.prototype.parse = function (context) {
    throw new Error('You have to implement the method parse()');
  };

  AbstractExpression.prototype.operate = function (v) {};

  AbstractExpression.prototype.toString = function () {
    return 'AbstractExpression';
  };

  return AbstractExpression;
})();
