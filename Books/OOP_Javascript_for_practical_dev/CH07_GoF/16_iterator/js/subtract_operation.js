CALC.createNameSpace('CALC.iterator.SubtractOperation');

CALC.iterator.SubtractOperation = (function () {
  var AbstractOperation = CALC.iterator.AbstractOperation;

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

  SubtractOperation.prototype.print = function (firstNumber, secondNumber) {
    var answer = this.getAnswer(firstNumber, secondNumber);

    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
