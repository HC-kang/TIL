CALC.createNameSpace('CALC.dip.after.DivideOperation');

CALC.dip.after.DivideOperation = (function () {
  var AbstractOperation = CALC.dip.after.AbstractOperation;

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

  DivideOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
