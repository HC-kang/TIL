CALC.createNameSpace('CALC.factory.DivideOperationProduct');

CALC.factory.DivideOperationProduct = (function () {
  var AbstractOperationProduct = CALC.factory.AbstractOperationProduct;

  var DivideOperationProduct;

  DivideOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  DivideOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DivideOperationProduct,
      },
    }
  );

  DivideOperationProduct.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    var answer = firstNumber / secondNumber;

    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  DivideOperationProduct.prototype.toString = function () {
    return 'DivideOperationProduct';
  };

  return DivideOperationProduct;
})();
