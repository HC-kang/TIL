CALC.createNameSpace('CALC.command.SubtractOperationCommand');

CALC.command.SubtractOperationCommand = (function () {
  var AbstractOperationCommand = CALC.command.AbstractOperationCommand;

  var SubtractOperationCommand;

  SubtractOperationCommand = function (receiver, value) {
    AbstractOperationCommand.apply(this, arguments);
  };

  SubtractOperationCommand.prototype = Object.create(
    AbstractOperationCommand.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubtractOperationCommand,
      },
    }
  );

  SubtractOperationCommand.prototype.execute = function () {
    this.receiver.subtract(this.value);
  };

  SubtractOperationCommand.prototype.toString = function () {
    return 'SubtractOperationCommand';
  };

  return SubtractOperationCommand;
})();
