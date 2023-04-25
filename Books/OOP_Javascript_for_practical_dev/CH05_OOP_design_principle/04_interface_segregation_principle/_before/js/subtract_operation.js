CALC.createNameSpace('CALC.isp.before.SubtractOperation');

CALC.isp.before.SubtractOperation = (function () {
  var AbstractOperation = CALC.isp.before.AbstractOperation;

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
