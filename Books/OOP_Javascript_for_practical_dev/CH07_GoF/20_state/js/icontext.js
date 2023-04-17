CALC.createNameSpace('CALC.state.IContext');

CALC.state.IContext = (function () {
  var IContext;

  IContext = function () {};

  IContext.prototype.changeState = function (state) {
    throw new Error('You have to implement the method changeState!');
  };

  IContext.prototype.updateDisplay = function (text) {
    throw new Error('You have to implement the method updateDisplay!');
  };

  IContext.prototype.appendInputToDisplay = function (input) {
    throw new Error('You have to implement the method appendInputToDisplay!');
  };

  IContext.prototype.isOperator = function (actionCommand) {
    throw new Error('You have to implement the method isOperator!');
  };

  IContext.prototype.calculate = function () {
    throw new Error('You have to implement the method calculate!');
  };

  IContext.prototype.setLastOperator = function (operator) {
    throw new Error('You have to implement the method setLastOperator!');
  };

  IContext.prototype.toString = function () {
    return 'IContext';
  };

  return IContext;
})();
