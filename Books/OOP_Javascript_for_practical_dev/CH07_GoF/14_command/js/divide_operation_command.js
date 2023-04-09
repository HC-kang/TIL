CALC.createNameSpace('CALC.command.DivideOperationCommand');

CALC.command.DivideOperationCommand = (function () {
  var AbstractOperationCommand = CALC.command.AbstractOperationCommand;

  var DivideOperationCommand;

  DivideOperationCommand = function (receiver, value) {
    AbstractOperationCommand.apply(this, arguments);
  };

  DivideOperationCommand.prototype = Object.create(
    AbstractOperationCommand.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: DivideOperationCommand,
      },
    }
  );

  DivideOperationCommand.prototype.execute = function () {
    this.receiver.divide(this.value);
  };

  DivideOperationCommand.prototype.toString = function () {
    return 'DivideOperationCommand';
  };

  return DivideOperationCommand;
})();
