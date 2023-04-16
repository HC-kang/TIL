CALC.createNameSpace('CALC.observer.AbstractOperationObserver');

CALC.observer.AbstractOperationObserver = (function () {
  var AbstractOperationObserver;

  AbstractOperationObserver = function (operationSubject) {
    this.operationSubject = operationSubject;
  };

  AbstractOperationObserver.prototype.update = function () {
    throw new Error('You have to implement the method update()!');
  };

  AbstractOperationObserver.prototype.getFirstNumber = function () {
    return this.operationSubject.getFirstNumber();
  };

  AbstractOperationObserver.prototype.getSecondNumber = function () {
    return this.operationSubject.getSecondNumber();
  };

  AbstractOperationObserver.prototype.toString = function () {
    return 'AbstractOperationObserver';
  };

  return AbstractOperationObserver;
})();
