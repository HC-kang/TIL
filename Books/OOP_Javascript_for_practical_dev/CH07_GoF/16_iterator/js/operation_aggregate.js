CALC.createNameSpace('CALC.iterator.OperationAggregate');

CALC.iterator.OperationAggregate = (function () {
  var AbstractAggregate = CALC.iterator.AbstractAggregate;

  var OperationAggregate;

  OperationAggregate = function () {
    AbstractAggregate.call(this);

    this.operations = [];
  };

  OperationAggregate.prototype = Object.create(AbstractAggregate.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: OperationAggregate,
    },
  });

  OperationAggregate.prototype.addOperation = function (operation) {
    this.operations.push(operation);
  };

  OperationAggregate.prototype.createIterator = function () {
    return new CALC.iterator.OperationIterator(this);
  };

  OperationAggregate.prototype.getOperationAt = function (index) {
    return this.operations[index];
  };

  OperationAggregate.prototype.getSize = function () {
    return this.operations.length;
  };

  OperationAggregate.prototype.toString = function () {
    return 'OperationAggregate';
  };

  return OperationAggregate;
})();
