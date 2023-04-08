CALC.createNameSpace('CALC.proxy.AddOperationSubject');

CALC.proxy.AddOperationSubject = (function () {
  var AbstractOperationSubject = CALC.proxy.AbstractOperationSubject;

  var AddOperationSubject;

  AddOperationSubject = function () {
    AbstractOperationSubject.call(this);
  };

  AddOperationSubject.prototype = Object.create(
    AbstractOperationSubject.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: AddOperationSubject,
      },
    }
  );

  AddOperationSubject.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperationSubject.prototype.toString = function () {
    return 'AddOperationSubject';
  };

  return AddOperationSubject;
})();
