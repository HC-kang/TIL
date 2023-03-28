CALC.createNameSpace('CALC.factorymethod.AbstractOperator');

CALC.factorymethod.AbstractOperator = (function () {
  var AbstractOperator;
  AbstractOperator = function () {};

  AbstractOperator.prototype.getAnswer = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method getAnswer!');
  };

  AbstractOperator.prototype.getDescription = function () {
    throw new Error('You have to implement the method getDescription!');
  };

  AbstractOperator.prototype.toString = function () {
    return 'AbstractOperator';
  };

  return AbstractOperator;
})();
