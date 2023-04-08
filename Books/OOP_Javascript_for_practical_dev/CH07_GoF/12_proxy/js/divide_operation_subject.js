CALC.createNameSpace('CALC.proxy.DivideOperationSubject');

CALC.proxy.DivideOperationSubject = (function () {
  var AbstractOperationSubject = CALC.proxy.AbstractOperationSubject;

  var DivideOperationSubject;

  DivideOperationSubject = function () {
    AbstractOperationSubject.call(this);
  };

  DivideOperationSubject.prototype = Object.create(
    AbstractOperationSubject.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationSubject,
      },
    }
  );

  DivideOperationSubject.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber / secondNumber;
  };

  DivideOperationSubject.prototype.toString = function () {
    return 'DivideOperationSubject';
  };

  return DivideOperationSubject;
})();
