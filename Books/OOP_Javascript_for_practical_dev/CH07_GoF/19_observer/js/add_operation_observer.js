CALC.createNameSpace('CALC.observer.AddOperationObserver');

CALC.observer.AddOperationObserver = (function () {
  var AbstractOperationObserver = CALC.observer.AbstractOperationObserver;

  var AddOperationObserver;
  AddOperationObserver = function (operationSubject) {
    AbstractOperationObserver.call(this, operationSubject);
  };

  AddOperationObserver.prototype = Object.create(
    AbstractOperationObserver.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AddOperationObserver,
      },
    }
  );

  AddOperationObserver.prototype.update = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    var answer = firstNumber + secondNumber;

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);
  };

  AddOperationObserver.prototype.toString = function () {
    return 'AddOperationObserver';
  };

  return AddOperationObserver;
})();
