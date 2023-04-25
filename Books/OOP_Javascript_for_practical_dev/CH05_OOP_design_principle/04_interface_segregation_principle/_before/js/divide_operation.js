CALC.createNameSpace('CALC.isp.before.DivideOperation');

CALC.isp.before.DivideOperation = (function () {
  var AbstractOperation = CALC.isp.before.AbstractOperation;

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

  DivideOperation.prototype.getOperator = function () {
    return '/';
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
