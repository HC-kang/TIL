CALC.createNameSpace('CALC.visitor.AbstractVisitor');

CALC.visitor.AbstractVisitor = (function () {
  var AbstractVisitor;

  AbstractVisitor = function () {};

  AbstractVisitor.prototype.visit = function (expression) {
    throw new Error('You have to implement the method visit!');
  };

  AbstractVisitor.prototype.toString = function () {
    return 'AbstractVisitor';
  };

  return AbstractVisitor;
})();
