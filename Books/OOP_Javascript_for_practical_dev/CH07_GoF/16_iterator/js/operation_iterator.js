CALC.createNameSpace('CALC.iterator.OperationIterator');

CALC.iterator.OperationIterator = (function () {
  var ICalcIterator = CALC.iterator.ICalcIterator;

  var OperationIterator;

  OperationIterator = function (operationAggregate) {
    ICalcIterator.call(this);

    this.operationAggregate = operationAggregate;
    this.index = 0;
  };

  OperationIterator.prototype = Object.create(ICalcIterator.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: OperationIterator,
    },
  });

  OperationIterator.prototype.hasNext = function () {
    if (this.index < this.operationAggregate.getSize()) {
      return true;
    } else {
      return false;
    }
  };

  OperationIterator.prototype.next = function () {
    var operation = this.operationAggregate.getOperationAt(this.index);
    this.index++;

    return operation;
  };

  OperationIterator.prototype.toString = function () {
    return 'OperationIterator';
  };

  return OperationIterator;
})();
