CALC.createNameSpace('CALC.prototype.AddOperationPrototype');

CALC.prototype.AddOperationPrototype = (function () {
  var AbstractOperationPrototype = CALC.prototype.AbstractOperationPrototype;

  var AddOperationPrototype;

  AddOperationPrototype = function (operation) {
    AbstractOperationPrototype.call(this, operation);
  };

  AddOperationPrototype.prototype = Object.create(
    AbstractOperationPrototype.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AddOperationPrototype,
      },
    }
  );

  AddOperationPrototype.prototype.getClone = function () {
    return new AddOperationPrototype(this);
  };

  AddOperationPrototype.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber + secondNumber;
  };

  AddOperationPrototype.prototype.getOperator = function () {
    return '+';
  };

  AddOperationPrototype.prototype.toString = function () {
    return 'AddOperationPrototype';
  };

  return AddOperationPrototype;
})();
