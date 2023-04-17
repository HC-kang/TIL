CALC.createNameSpace('CALC.state.StartState');

CALC.state.StartState = (function () {
  var IState = CALC.state.IState;

  var StartState;

  StartState = function () {
    if (StartState._instance) {
      return StartState._instance;
    }

    StartState._instance = this;
  };

  StartState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: StartState,
    },
  });

  StartState.getInstance = function () {
    if (!StartState._instance) {
      StartState._instance = new StartState();
    }

    return StartState._instance;
  };

  StartState.prototype.action = function (context, actionCommand) {
    var InputState = CALC.state.InputState;

    context.updateDisplay(actionCommand);

    context.changeState(InputState.getInstance());
  };

  StartState.prototype.toString = function () {
    return 'StartState';
  };

  return StartState;
})();
