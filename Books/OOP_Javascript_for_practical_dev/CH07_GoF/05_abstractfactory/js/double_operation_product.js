CALC.createNameSpace('CALC.abstractfactory.DoubleOperationProduct');

CALC.abstractfactory.DoubleOperationProduct = (function () {
  var AbstractOperationProduct = CALC.abstractfactory.AbstractOperationProduct;
  var DoubleOperationProduct;

  DoubleOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  DoubleOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: DoubleOperationProduct,
      },
    }
  );

  DoubleOperationProduct.prototype.print = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + this.add());
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + this.subtract());
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + this.multiply());
    console.log(firstNumber + ' / ' + secondNumber + ' = ' + this.divide());
  };

  DoubleOperationProduct.prototype.toString = function () {
    return 'DoubleOperationProduct';
  };

  return DoubleOperationProduct;
})();
