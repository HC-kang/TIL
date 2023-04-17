CALC.createNameSpace('CALC.state.Client');

CALC.state.Client = (function () {
  var Client;

  Client = function () {
    var StartState = CALC.state.StartState;

    this.displayNumber = '';

    this.result = 0;
    this.lastOperator = '=';

    this.state = null;

    this.changeState(StartState.getInstance());
  };

  Client.prototype.updateDisplay = function (text) {
    this.displayNumber = text;

    console.log('display : ' + text);
  };

  Client.prototype.appendInputToDisplay = function (input_) {
    this.updateDisplay(this.displayNumber + input_);
  };

  Client.prototype.calculate = function () {
    this._calculate(this.lastOperator, this.displayNumber);
  };

  Client.prototype._calculate = function (operator, value) {
    if (operator === '+') {
      this.result += value;
    } else if (operator === '-') {
      this.result -= value;
    } else if (operator === '*') {
      this.result *= value;
    } else if (operator === '/') {
      this.result /= value;
    } else if (operator === '=') {
      this.result = value;
    }

    this.updateDisplay('' + this.result);
  };

  Client.prototype.changeState = function (state) {
    this.state = state;

    console.log('changeState -> ' + state.toString());
  };

  Client.prototype.isOperator = function (actionCommand) {
    if (actionCommand === '+') {
      return true;
    } else if (actionCommand === '-') {
      return true;
    } else if (actionCommand === '*') {
      return true;
    } else if (actionCommand === '/') {
      return true;
    } else if (actionCommand === '=') {
      return true;
    }

    return false;
  };

  Client.prototype.action = function (actionCommand) {
    this.state.action(this, actionCommand);
  };

  Client.prototype.setLastOperator = function (lastCommand) {
    this.lastOperator = lastCommand;
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
