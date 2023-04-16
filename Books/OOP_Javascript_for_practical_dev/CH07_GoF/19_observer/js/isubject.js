CALC.createNameSpace('CALC.observer.ISubject');

CALC.observer.ISubject = (function () {
  var ISubject;

  ISubject = function (operationSubject) {
    this.operationSubject = operationSubject;
  };

  ISubject.prototype.notifyObservers = function () {
    throw new Error('You have to implement the method notifyObservers()!');
  };

  ISubject.prototype.registerObserver = function (observer) {
    throw new Error('You have to implement the method registerObserver()!');
  };

  ISubject.prototype.removeObserver = function (observer) {
    throw new Error('You have to implement the method removeObserver()!');
  };

  ISubject.prototype.toString = function () {
    return 'ISubject';
  };

  return ISubject;
})();
