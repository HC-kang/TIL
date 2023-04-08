CALC.createNameSpace('CALC.proxy.MultiplyOperationSubject');

CALC.proxy.MultiplyOperationSubject = (function () {
  var AbstractOperationSubject = CALC.proxy.AbstractOperationSubject;

  var MultiplyOperationSubject;

  MultiplyOperationSubject = function () {
    AbstractOperationSubject.call(this);
  };

  MultiplyOperationSubject.prototype = Object.create(
    AbstractOperationSubject.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: MultiplyOperationSubject,
      },
    }
  );

  MultiplyOperationSubject.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber * secondNumber;
  };

  MultiplyOperationSubject.prototype.toString = function () {
    return 'MultiplyOperationSubject';
  };

  return MultiplyOperationSubject;
})();
