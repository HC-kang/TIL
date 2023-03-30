CALC.createNameSpace('CALC.abstractfactory.AbstractOperationFactory');

CALC.abstractfactory.AbstractOperationFactory = (function () {
  var AbstractOperationFactory;

  AbstractOperationFactory = function () {};

  AbstractOperationFactory.prototype.createOperationProduct = function () {
    throw new Error('You have to implement the method doSomething!');
  };

  AbstractOperationFactory.prototype.createNumberOperandProduct = function (
    value
  ) {
    throw new Error('You have to implement the method doSomething!');
  };

  AbstractOperationFactory.prototype.toString = function () {
    return 'AbstractOperationFactory';
  };

  return AbstractOperationFactory;
})();
