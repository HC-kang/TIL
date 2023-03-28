CALC.createNameSpace('CALC.factorymethod.AddOperation');

CALC.factorymethod.AddOperation = (function () {
  var AddOperator = CALC.factorymethod.AddOperator;

  var AbstractOperation = CALC.factorymethod.AbstractOperation;

  var AddOperation;

  AddOperation = function () {
    AbstractOperation.call(this);
  };

  AddOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: AddOperation,
    },
  });

  AddOperation.prototype.getOperator = function () {
    return new AddOperator();
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
