CALC.createNameSpace('CALC.observer.MultiplyOperationObserver');

CALC.observer.MultiplyOperationObserver = (function () {
  var AbstractOperationObserver = CALC.observer.AbstractOperationObserver;

  var MultiplyOperationObserver;

  MultiplyOperationObserver = function (operationSubject) {
    AbstractOperationObserver.call(this, operationSubject);
  };

  MultiplyOperationObserver.prototype = Object.create(
    AbstractOperationObserver.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MultiplyOperationObserver,
      },
    }
  );

  MultiplyOperationObserver.prototype.update = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var answer = firstNumber * secondNumber;

    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);
  };

  MultiplyOperationObserver.prototype.toString = function () {
    return 'MultiplyOperationObserver';
  };

  return MultiplyOperationObserver;
})();
