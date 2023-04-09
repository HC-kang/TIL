CALC.createNameSpace('CALC.command.AbstractOperationCommand');

CALC.command.AbstractOperationCommand = (function () {
  var AbstractOperationCommand;

  AbstractOperationCommand = function (receiver, value) {
    this.receiver = receiver;
    this.value = value;
  };

  AbstractOperationCommand.prototype.execute = function () {
    throw new Error('You have to implement the method execute()');
  };

  AbstractOperationCommand.prototype.toString = function () {
    return 'AbstractOperationCommand';
  };

  return AbstractOperationCommand;
})();
