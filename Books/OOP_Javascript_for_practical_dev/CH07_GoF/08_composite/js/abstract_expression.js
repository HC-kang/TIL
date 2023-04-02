CALC.createNameSpace('CALC.composite.AbstractExpression');

CALC.composite.AbstractExpression = (function () {
  var AbstractExpression;

  AbstractExpression = function () {};

  AbstractExpression.prototype.operate = function () {
    throw new Error('You have to implement the method operate()!');
  };

  AbstractExpression.prototype.toString = function () {
    return 'AbstractExpression';
  };

  return AbstractExpression;
})();
