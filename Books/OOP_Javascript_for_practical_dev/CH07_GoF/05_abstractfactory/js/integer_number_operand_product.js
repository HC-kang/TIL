CALC.createNameSpace('CALC.abstractfactory.IntegerNumberOperandProduct');

CALC.abstractfactory.IntegerNumberOperandProduct = (function () {
  var AbstractNumberOperandProduct =
    CALC.abstractfactory.AbstractNumberOperandProduct;

  var IntegerNumberOperandProduct;

  IntegerNumberOperandProduct = function (value) {
    AbstractNumberOperandProduct.call(this, value);
  };

  IntegerNumberOperandProduct.prototype = Object.create(
    AbstractNumberOperandProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: IntegerNumberOperandProduct,
      },
    }
  );

  IntegerNumberOperandProduct.prototype.getNumber = function () {
    var value = this.getValue();
    return parseInt(value);
  };

  IntegerNumberOperandProduct.prototype.toString = function () {
    return 'IntegerNumberOperandProduct';
  };

  return IntegerNumberOperandProduct;
})();
