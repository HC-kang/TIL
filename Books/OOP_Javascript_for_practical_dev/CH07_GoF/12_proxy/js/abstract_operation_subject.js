CALC.createNameSpace('CALC.proxy.abstractOperationSubject');

CALC.proxy.AbstractOperationSubject = (function () {
  var AbstractOperationSubject;

  AbstractOperationSubject = function () {};

  AbstractOperationSubject.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method operate');
  };

  AbstractOperationSubject.prototype.toString = function () {
    return 'AbstractOperationSubject';
  };

  return AbstractOperationSubject;
})();
