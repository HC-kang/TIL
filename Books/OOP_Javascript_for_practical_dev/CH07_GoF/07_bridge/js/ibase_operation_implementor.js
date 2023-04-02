CALC.createNameSpace('CALC.bridge.IBaseOperationImplementor');

CALC.bridge.IBaseOperationImplementor = (function () {
  var IBaseOperationImplementor;

  IBaseOperationImplementor = function () {};

  IBaseOperationImplementor.prototype.add = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method add');
  };

  IBaseOperationImplementor.prototype.subtract = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method subtract');
  };

  IBaseOperationImplementor.prototype.multiply = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method multiply');
  };

  IBaseOperationImplementor.prototype.divide = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method divide');
  };

  IBaseOperationImplementor.prototype.toString = function () {
    return 'IBaseOperationImplementor';
  };

  return IBaseOperationImplementor;
})();
