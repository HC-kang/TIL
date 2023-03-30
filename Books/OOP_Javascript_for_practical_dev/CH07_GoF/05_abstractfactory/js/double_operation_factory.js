CALC.createNameSpace('CALC.abstractfactory.DoubleOperationFactory');

CALC.abstractfactory.DoubleOperationFactory = (function () {
  var AbstractOperationFactory = CALC.abstractfactory.AbstractOperationFactory;

  var DoubleOperationProduct = CALC.abstractfactory.DoubleOperationProduct;
  var DoubleNumberOperandProduct =
    CALC.abstractfactory.DoubleNumberOperandProduct;

  var DoubleOperationFactory;

  DoubleOperationFactory = function () {
    AbstractOperationFactory.call(this);
  };

  DoubleOperationFactory.prototype = Object.create(
    AbstractOperationFactory.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DoubleOperationFactory,
      },
    }
  );

  DoubleOperationFactory.prototype.createOperationProduct = function () {
    return new DoubleOperationProduct();
  };

  DoubleOperationFactory.prototype.createNumberOperandProduct = function (
    value
  ) {
    return new DoubleNumberOperandProduct(value);
  };

  DoubleOperationFactory.prototype.toString = function () {
    return 'DoubleOperationFactory';
  };

  return DoubleOperationFactory;
})();
