CALC.createNameSpace('CALC.abstractfactory.IntegerOperationProduct');

CALC.abstractfactory.IntegerOperationProduct = (function () {
  var AbstractOperationProduct = CALC.abstractfactory.AbstractOperationProduct;

  var IntegerOperationProduct;

  IntegerOperationProduct = function () {
    AbstractOperationProduct.call(this);
  };

  IntegerOperationProduct.prototype = Object.create(
    AbstractOperationProduct.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: IntegerOperationProduct,
      },
    }
  );

  IntegerOperationProduct.prototype.print = function () {
    var firstNumber = this.getFirstNumber();
    var secondNumber = this.getSecondNumber();

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + this.add());
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + this.subtract());
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + this.multiply());
    console.log(firstNumber + ' / ' + secondNumber + ' = ' + this.divide());
  };

  IntegerOperationProduct.prototype.toString = function () {
    return 'IntegerOperationProduct';
  };

  return IntegerOperationProduct;
})();
