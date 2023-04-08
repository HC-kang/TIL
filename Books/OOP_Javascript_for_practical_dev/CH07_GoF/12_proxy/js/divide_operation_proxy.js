CALC.createNameSpace('CALC.proxy.DivideOperationProxy');

CALC.proxy.DivideOperationProxy = (function () {
  var AbstractOperationSubject = CALC.proxy.AbstractOperationSubject;
  var DivideOperationProxy;

  DivideOperationProxy = function (realOperationSubject) {
    AbstractOperationSubject.call(this);
    this.realOperationSubject = realOperationSubject;
  };

  DivideOperationProxy.prototype = Object.create(
    AbstractOperationSubject.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationProxy,
      },
    }
  );

  DivideOperationProxy.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    if (secondNumber === 0) {
      throw new Error('NonZeroDivideException');
    }

    return this.realOperationSubject.operate(firstNumber, secondNumber);
  };

  DivideOperationProxy.prototype.toString = function () {
    return 'DivideOperationProxy';
  };

  return DivideOperationProxy;
})();
