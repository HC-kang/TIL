CALC.createNameSpace('CALC.command.OperationCommandReceiver');

CALC.command.OperationCommandReceiver = (function () {
  var OperationCommandReceiver;

  OperationCommandReceiver = function () {
    this.result = 0;
  };

  OperationCommandReceiver.prototype.getResult = function () {
    return this.result;
  };

  OperationCommandReceiver.prototype.add = function (value) {
    this.result += value;
  };

  OperationCommandReceiver.prototype.subtract = function (value) {
    this.result -= value;
  };

  OperationCommandReceiver.prototype.multiply = function (value) {
    this.result *= value;
  };

  OperationCommandReceiver.prototype.divide = function (value) {
    this.result /= value;
  };

  OperationCommandReceiver.prototype.toString = function () {
    return this.result;
  };

  return OperationCommandReceiver;
})();
