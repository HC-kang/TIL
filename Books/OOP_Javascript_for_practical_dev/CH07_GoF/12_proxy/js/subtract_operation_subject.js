CALC.createNameSpace('CALC.proxy.SubtractOperationSubject');

CALC.proxy.SubtractOperationSubject = (function () {
  var AbstractOperationSubject = CALC.proxy.AbstractOperationSubject;

  var SubtractOperationSubject;

  SubtractOperationSubject = function () {
    AbstractOperationSubject.call(this);
  };

  SubtractOperationSubject.prototype = Object.create(
    AbstractOperationSubject.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubtractOperationSubject,
      },
    }
  );

  SubtractOperationSubject.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber - secondNumber;
  };

  SubtractOperationSubject.prototype.toString = function () {
    return 'SubtractOperationSubject';
  };

  return SubtractOperationSubject;
})();
