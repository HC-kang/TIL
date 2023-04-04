CALC.createNameSpace('CALC.factory.MultiplyOperationProduct');

CALC.factory.MultiplyOperationProduct = (function () {
  var AbstractOperationProduct = CALC.factory.AbstractOperationProduct;

  var MultiplyOperationProduct;

  MultiplyOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  MultiplyOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MultiplyOperationProduct,
      },
    }
  );

  MultiplyOperationProduct.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    var answer = firstNumber * secondNumber;

    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);
  };

  MultiplyOperationProduct.prototype.toString = function () {
    return 'MultiplyOperationProduct';
  };

  return MultiplyOperationProduct;
})();
