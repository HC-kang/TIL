CALC.createNameSpace('CALC.state.IState');

CALC.state.IState = (function () {
  var IState;

  IState = function () {};

  IState.prototype.action = function (context, actionCommand) {
    throw new Error('You have to implement the method action!');
  };

  IState.prototype.toString = function () {
    return 'IState';
  };

  return IState;
})();
