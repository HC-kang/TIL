CALC.createNameSpace('CALC.templatemethod.SubtractOperation');

CALC.templatemethod.SubtractOperation = (function () {
  var AbstractOperation = CALC.templatemethod.AbstractOperation;

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

  SubtractOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
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
