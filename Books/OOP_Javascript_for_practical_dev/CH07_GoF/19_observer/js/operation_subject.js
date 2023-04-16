CALC.createNameSpace('CALC.observer.OperationSubject');

CALC.observer.OperationSubject = (function () {
  var ISubject = CALC.observer.ISubject;

  var OperationSubject;

  OperationSubject = function () {
    ISubject.call(this);

    this.firstNumber = 0;
    this.secondNumber = 0;

    this.observers = [];
  };

  OperationSubject.prototype = Object.create(ISubject.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      wriatable: true,
      value: OperationSubject,
    },
  });

  OperationSubject.prototype.registerObserver = function (observer) {
    this.observers.push(observer);
  };

  OperationSubject.prototype.removeObserver = function (observer) {
    var index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  };

  OperationSubject.prototype.notifyObservers = function () {
    for (var i = 0; i < this.observers.length; i++) {
      this.observers[i].update();
    }
  };

  OperationSubject.prototype.getFirstNumber = function () {
    return this.firstNumber;
  };

  OperationSubject.prototype.getSecondNumber = function () {
    return this.secondNumber;
  };

  OperationSubject.prototype.setNumber = function (firstNumber, secondNumber) {
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;

    this.notifyObservers();
  };

  OperationSubject.prototype.toString = function () {
    return 'OperationSubject';
  };

  return OperationSubject;
})();
