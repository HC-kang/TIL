CALC.createNameSpace('CALC.iterator.DivideOperation');

CALC.iterator.DivideOperation = (function () {
  var AbstractOperation = CALC.iterator.AbstractOperation;

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

  DivideOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.print = function (firstNumber, secondNumber) {
    var answer = this.getAnswer(firstNumber, secondNumber);

    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
