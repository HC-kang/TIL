CALC.createNameSpace('CALC.isp.after.SubtractOperation');

CALC.isp.after.SubtractOperation = (function () {
  var AbstractOperation = CALC.isp.after.AbstractOperation;

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

  SubtractOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperation.prototype.getOperator = function () {
    return '-';
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
