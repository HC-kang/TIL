CALC.createNameSpace('CALC.iterator.AddOperation');

CALC.iterator.AddOperation = (function () {
  var AbstractOperation = CALC.iterator.AbstractOperation;

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

  AddOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperation.prototype.print = function (firstNumber, secondNumber) {
    var answer = this.getAnswer(firstNumber, secondNumber);

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
