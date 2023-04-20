CALC.createNameSpace('CALC.visitor.expression.AbstractExpression');

CALC.visitor.expression.AbstractExpression = (function () {
  var AbstractExpression;

  AbstractExpression = function () {};

  AbstractExpression.prototype.operate = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method operate!');
  };

  AbstractExpression.prototype.accept = function (v) {};

  AbstractExpression.prototype.toString = function () {
    return 'AbstractExpression';
  };

  return AbstractExpression;
})();
