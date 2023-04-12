CALC.createNameSpace('CALC.iterator.MultiplyOperation');

CALC.iterator.MultiplyOperation = (function () {
  var AbstractOperation = CALC.iterator.AbstractOperation;

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

  MultiplyOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.print = function (firstNumber, secondNumber) {
    var answer = this.getAnswer(firstNumber, secondNumber);

    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
