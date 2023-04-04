CALC.createNameSpace('CALC.factory.SubtractOperationProduct');

CALC.factory.SubtractOperationProduct = (function () {
  var AbstractOperationProduct = CALC.factory.AbstractOperationProduct;

  var SubtractOperationProduct;

  SubtractOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  SubtractOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SubtractOperationProduct,
      },
    }
  );

  SubtractOperationProduct.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    var answer = firstNumber - secondNumber;

    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);
  };

  SubtractOperationProduct.prototype.toString = function () {
    return 'SubtractOperationProduct';
  };

  return SubtractOperationProduct;
})();
