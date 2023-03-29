CALC.createNameSpace('CALC.prototype.SubtractOperationPrototype');

CALC.prototype.SubtractOperationPrototype = (function () {
  var AbstractOperationPrototype = CALC.prototype.AbstractOperationPrototype;

  var SubtractOperationPrototype;

  SubtractOperationPrototype = function (operation) {
    AbstractOperationPrototype.call(this, operation);
  };

  SubtractOperationPrototype.prototype = Object.create(
    AbstractOperationPrototype.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        value: SubtractOperationPrototype,
        writable: true,
      },
    }
  );

  SubtractOperationPrototype.prototype.getClone = function () {
    return new SubtractOperationPrototype(this);
  };

  SubtractOperationPrototype.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber - secondNumber;
  };

  SubtractOperationPrototype.prototype.getOperator = function () {
    return '-';
  };

  SubtractOperationPrototype.prototype.toString = function () {
    return 'SubtractOperationPrototype';
  };

  return SubtractOperationPrototype;
})();
