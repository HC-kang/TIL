CALC.createNameSpace('CALC.state.InputState');

CALC.state.InputState = (function () {
  var IState = CALC.state.IState;

  var InputState;

  InputState = function () {
    if (InputState._instance) {
      return InputState._instance;
    }

    InputState._instance = this;
  };

  InputState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: InputState,
    },
  });

  InputState.getInstance = function () {
    if (!InputState._instance) {
      InputState._instance = new InputState();
    }

    return InputState._instance;
  };

  InputState.prototype.action = function (context, actionCommand) {
    var OperatorState = CALC.state.OperatorState;

    if (context.isOperator(actionCommand)) {
      context.calculate();
      context.setLastOperator(actionCommand);

      context.changeState(OperatorState.getInstance());
    } else {
      context.appendInputToDisplay(actionCommand);
    }
  };

  InputState.prototype.toString = function () {
    return 'InputState';
  };

  return InputState;
})();
