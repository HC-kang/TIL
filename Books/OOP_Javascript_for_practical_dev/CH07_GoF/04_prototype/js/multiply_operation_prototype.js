CALC.createNameSpace('CALC.prototype.MultiplyOperationPrototype');

CALC.prototype.MultiplyOperationPrototype = (function () {
  var AbstractOperationPrototype = CALC.prototype.AbstractOperationPrototype;

  var MultiplyOperationPrototype;

  MultiplyOperationPrototype = function (operation) {
    AbstractOperationPrototype.call(this, operation);
  };

  MultiplyOperationPrototype.prototype = Object.create(
    AbstractOperationPrototype.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MultiplyOperationPrototype,
      },
    }
  );

  MultiplyOperationPrototype.prototype.getClone = function () {
    return new MultiplyOperationPrototype(this);
  };

  MultiplyOperationPrototype.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber * secondNumber;
  };

  MultiplyOperationPrototype.prototype.getOperator = function () {
    return '*';
  };

  MultiplyOperationPrototype.prototype.toString = function () {
    return 'MultiplyOperationPrototype';
  };

  return MultiplyOperationPrototype;
})();
