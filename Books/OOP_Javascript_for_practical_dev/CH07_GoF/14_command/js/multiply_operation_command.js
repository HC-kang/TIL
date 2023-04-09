CALC.createNameSpace('CALC.command.MultiplyOperationCommand');

CALC.command.MultiplyOperationCommand = (function () {
  var AbstractOperationCommand = CALC.command.AbstractOperationCommand;

  var MultiplyOperationCommand;

  MultiplyOperationCommand = function (receiver, value) {
    AbstractOperationCommand.apply(this, arguments);
  };

  MultiplyOperationCommand.prototype = Object.create(
    AbstractOperationCommand.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: MultiplyOperationCommand,
      },
    }
  );

  MultiplyOperationCommand.prototype.execute = function () {
    this.receiver.multiply(this.value);
  };

  MultiplyOperationCommand.prototype.toString = function () {
    return 'MultiplyOperationCommand';
  };

  return MultiplyOperationCommand;
})();
