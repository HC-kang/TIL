CALC.createNameSpace('CALC.iterator.ICalcIterator');

CALC.iterator.ICalcIterator = (function () {
  var ICalcIterator;

  ICalcIterator = function () {};

  ICalcIterator.prototype.hasNext = function () {
    throw new Error('You have to implement the method hasNext()!');
  };

  ICalcIterator.prototype.next = function () {
    throw new Error('You have to implement the method next()!');
  };

  ICalcIterator.prototype.toString = function () {
    return 'ICalcIterator';
  };

  return ICalcIterator;
})();
