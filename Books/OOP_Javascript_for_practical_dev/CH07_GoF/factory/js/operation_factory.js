CALC.createNameSpace('CALC.factory.OperationFactory');

CALC.factory.OperationFactory = (function () {
  var AddOperationProduct = CALC.factory.AddOperationProduct;
  var SubtractOperationProduct = CALC.factory.SubtractOperationProduct;
  var MultiplyOperationProduct = CALC.factory.MultiplyOperationProduct;
  var DivideOperationProduct = CALC.factory.DivideOperationProduct;

  var OperationFactory;

  OperationFactory = function () {};

  OperationFactory.prototype.createOperationProduct = function (operator) {
    if (operator === '+') {
      return new AddOperationProduct();
    } else if (operator === '-') {
      return new SubtractOperationProduct();
    } else if (operator === '*') {
      return new MultiplyOperationProduct();
    } else if (operator === '/') {
      return new DivideOperationProduct();
    }

    return null;
  };

  OperationFactory.prototype.toString = function () {
    return 'OperationFactory';
  };

  return OperationFactory;
})();
