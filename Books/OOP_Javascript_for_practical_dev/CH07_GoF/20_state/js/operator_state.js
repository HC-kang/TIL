CALC.createNameSpace('CALC.state.OperatorState');

CALC.state.OperatorState = (function () {
  var IState = CALC.state.IState;

  var OperatorState;

  OperatorState = function () {
    if (OperatorState._instance) {
      return OperatorState._instance;
    }

    OperatorState._instance = this;
  };

  OperatorState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      value: OperatorState,
      writable: true,
    },
  });

  OperatorState.getInstance = function () {
    if (!OperatorState._instance) {
      OperatorState._instance = new OperatorState();
    }

    return OperatorState._instance;
  };

  OperatorState.prototype.action = function (context, actionCommand) {
    var InputState = CALC.state.InputState;

    if (context.isOperator(actionCommand)) {
      context.setLastOperator(actionCommand);
    } else {
      context.updateDisplay('');
      context.appendInputToDisplay(actionCommand);

      context.changeState(InputState.getInstance());
    }
  };

  OperatorState.prototype.toString = function () {
    return 'OperatorState';
  };

  return OperatorState;
})();
 