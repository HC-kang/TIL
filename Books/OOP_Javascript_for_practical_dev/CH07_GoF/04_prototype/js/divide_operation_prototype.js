CALC.createNameSpace('CALC.prototype.DivideOperationPrototype');

CALC.prototype.DivideOperationPrototype = (function () {
  var AbstractOperationPrototype = CALC.prototype.AbstractOperationPrototype;

  var DivideOperationPrototype;

  DivideOperationPrototype = function (operation) {
    AbstractOperationPrototype.call(this, operation);
  };

  DivideOperationPrototype.prototype = Object.create(
    AbstractOperationPrototype.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DivideOperationPrototype,
      },
    }
  );

  DivideOperationPrototype.prototype.getClone = function () {
    return new DivideOperationPrototype(this);
  };

  DivideOperationPrototype.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber / secondNumber;
  };

  DivideOperationPrototype.prototype.getOperator = function () {
    return '/';
  };

  DivideOperationPrototype.prototype.toString = function () {
    return 'DivideOperationPrototype';
  };

  return DivideOperationPrototype;
})();
