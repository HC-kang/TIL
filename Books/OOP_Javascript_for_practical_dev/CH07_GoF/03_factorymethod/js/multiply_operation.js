CALC.createNameSpace('CALC.factorymethod.MultiplyOperation');

CALC.factorymethod.MultiplyOperation = (function () {
  var MultiplyOperator = CALC.factorymethod.MultiplyOperator;

  var AbstractOperation = CALC.factorymethod.AbstractOperation;

  var MultiplyOperation;

  MultiplyOperation = function () {
    AbstractOperation.call(this);
  };

  MultiplyOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: MultiplyOperation,
    },
  });

  MultiplyOperation.prototype.getOperator = function () {
    return new MultiplyOperator();
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
