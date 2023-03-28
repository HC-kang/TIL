CALC.createNameSpace('CALC.factorymethod.DivideOperation');

CALC.factorymethod.DivideOperation = (function () {
  var DivideOperator = CALC.factorymethod.DivideOperator;

  var AbstractOperation = CALC.factorymethod.AbstractOperation;

  var DivideOperation;

  DivideOperation = function () {
    AbstractOperation.call(this);
  };

  DivideOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: DivideOperation,
    },
  });

  DivideOperation.prototype.getOperator = function () {
    return new DivideOperator();
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
