CALC.createNameSpace('CALC.observer.DivideOperationObserver');

CALC.observer.DivideOperationObserver = (function () {
  var AbstractOperationObserver = CALC.observer.AbstractOperationObserver;

  var DivideOperationObserver;

  DivideOperationObserver = function (operationSubject) {
    AbstractOperationObserver.call(this, operationSubject);
  };

  DivideOperationObserver.prototype = Object.create(
    AbstractOperationObserver.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DivideOperationObserver,
      },
    }
  );

  DivideOperationObserver.prototype.update = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var answer = firstNumber / secondNumber;

    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  DivideOperationObserver.prototype.toString = function () {
    return 'DivideOperationObserver';
  };

  return DivideOperationObserver;
})();
