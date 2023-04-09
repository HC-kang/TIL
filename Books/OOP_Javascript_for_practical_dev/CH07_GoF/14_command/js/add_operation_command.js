CALC.createNameSpace('CALC.command.AddOperationCommand');

CALC.command.AddOperationCommand = (function () {
  var AbstractOperationCommand = CALC.command.AbstractOperationCommand;

  var AddOperationCommand;

  AddOperationCommand = function (receiver, value) {
    AbstractOperationCommand.apply(this, arguments);
  };

  AddOperationCommand.prototype = Object.create(
    AbstractOperationCommand.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: AddOperationCommand,
      },
    }
  );

  AddOperationCommand.prototype.execute = function () {
    this.receiver.add(this.value);
  };

  AddOperationCommand.prototype.toString = function () {
    return 'AddOperationCommand';
  };

  return AddOperationCommand;
})();
