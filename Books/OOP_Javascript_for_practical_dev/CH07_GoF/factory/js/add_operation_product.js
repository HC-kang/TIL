CALC.createNameSpace('CALC.factory.AddOperationProduct');

CALC.factory.AddOperationProduct = (function () {
  var AbstractOperationProduct = CALC.factory.AbstractOperationProduct;

  var AddOperationProduct;

  AddOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  AddOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AddOperationProduct,
      },
    }
  );

  AddOperationProduct.prototype.operate = function (firstNumber, secondNumber) {
    var answer = firstNumber + secondNumber;

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);
  };

  AddOperationProduct.prototype.toString = function () {
    return 'AddOperationProduct';
  };

  return AddOperationProduct;
})();
