CALC.createNameSpace('CALC.observer.SubtractOperationObserver');

CALC.observer.SubtractOperationObserver = (function () {
  var AbstractOperationObserver = CALC.observer.AbstractOperationObserver;

  var SubtractOperationObserver;

  SubtractOperationObserver = function (operationSubject) {
    AbstractOperationObserver.call(this, operationSubject);
  };

  SubtractOperationObserver.prototype = Object.create(
    AbstractOperationObserver.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SubtractOperationObserver,
      },
    }
  );

  SubtractOperationObserver.prototype.update = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var answer = firstNumber - secondNumber;

    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);
  };

  SubtractOperationObserver.prototype.toString = function () {
    return 'SubtractOperationObserver';
  };

  return SubtractOperationObserver;
})();
