CALC.createNameSpace('CALC.factory.AbstractOperationProduct');

CALC.factory.AbstractOperationProduct = (function () {
  var AbstractOperationProduct;

  AbstractOperationProduct = function () {};

  AbstractOperationProduct.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('This method must be overwritten!');
  };

  AbstractOperationProduct.prototype.toString = function () {
    return 'AbstractOperationProduct';
  };

  return AbstractOperationProduct;
})();
