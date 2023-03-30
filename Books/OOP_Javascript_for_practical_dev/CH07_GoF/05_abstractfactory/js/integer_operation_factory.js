CALC.createNameSpace('CALC.abstractfactory.IntegerOperationFactory');

CALC.abstractfactory.IntegerOperationFactory = (function () {
  var AbstractOperationFactory = CALC.abstractfactory.AbstractOperationFactory;

  var IntegerOperationProduct = CALC.abstractfactory.IntegerOperationProduct;
  var IntegerNumberOperandProduct =
    CALC.abstractfactory.IntegerNumberOperandProduct;

  var IntegerOperationFactory;

  IntegerOperationFactory = function () {
    AbstractOperationFactory.call(this);
  };

  IntegerOperationFactory.prototype = Object.create(
    AbstractOperationFactory.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        value: IntegerOperationFactory,
        writable: true,
      },
    }
  );

  IntegerOperationFactory.prototype.createOperationProduct = function () {
    return new IntegerOperationProduct();
  };

  IntegerOperationFactory.prototype.createNumberOperandProduct = function (
    value
  ) {
    return new IntegerNumberOperandProduct(value);
  };

  IntegerOperationFactory.prototype.toString = function () {
    return 'IntegerOperationFactory';
  };

  return IntegerOperationFactory;
})();
