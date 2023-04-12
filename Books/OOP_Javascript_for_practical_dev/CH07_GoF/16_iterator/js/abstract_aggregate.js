CALC.createNameSpace('CALC.iterator.AbstractAggregate');

CALC.iterator.AbstractAggregate = (function () {
  var AbstractAggregate;

  AbstractAggregate = function () {};

  AbstractAggregate.prototype.createIterator = function () {
    throw new Error('You have to implement the method createIterator()!');
  };

  AbstractAggregate.prototype.toString = function () {
    return 'AbstractAggregate';
  };

  return AbstractAggregate;
})();
