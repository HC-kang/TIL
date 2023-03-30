CALC.createNameSpace('CALC.abstractfactory.DoubleNumberOperandProduct');

CALC.abstractfactory.DoubleNumberOperandProduct = (function () {
  var AbstractNumberOperandProduct =
    CALC.abstractfactory.AbstractNumberOperandProduct;
  var DoubleNumberOperandProduct;

  DoubleNumberOperandProduct = function (value) {
    AbstractNumberOperandProduct.call(this, value);
  };

  DoubleNumberOperandProduct.prototype = Object.create(
    AbstractNumberOperandProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DoubleNumberOperandProduct,
      },
    }
  );

  DoubleNumberOperandProduct.prototype.getNumber = function () {
    var value = this.getValue();
    return parseFloat(value);
  };

  DoubleNumberOperandProduct.prototype.toString = function () {
    return 'DoubleNumberOperandProduct';
  };

  return DoubleNumberOperandProduct;
})();
