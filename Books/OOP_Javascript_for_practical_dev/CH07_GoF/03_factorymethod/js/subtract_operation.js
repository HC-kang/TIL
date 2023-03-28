CALC.createNameSpace('CALC.factorymethod.SubtractOperation');

CALC.factorymethod.SubtractOperation = (function () {
  var SubtractOperator = CALC.factorymethod.SubtractOperator;

  var AbstractOperation = CALC.factorymethod.AbstractOperation;

  var SubtractOperation;

  SubtractOperation = function () {
    AbstractOperation.call(this);
  };

  SubtractOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: SubtractOperation,
    },
  });

  SubtractOperation.prototype.getOperator = function () {
    return new SubtractOperator();
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
