CALC.createNameSpace('CALC.abstractfactory.AbstractNumberOperandProduct');

CALC.abstractfactory.AbstractNumberOperandProduct = (function () {
  var AbstractNumberOperandProduct;

  AbstractNumberOperandProduct = function (value) {
    this.value = value;
  };

  AbstractNumberOperandProduct.prototype.getNumber = function () {
    throw new Error('You have to implement the method getNumber!');
  };

  AbstractNumberOperandProduct.prototype.getValue = function () {
    return this.value;
  };

  AbstractNumberOperandProduct.prototype.toString = function () {
    return 'AbstractNumberOperandProduct';
  };

  return AbstractNumberOperandProduct;
})();
