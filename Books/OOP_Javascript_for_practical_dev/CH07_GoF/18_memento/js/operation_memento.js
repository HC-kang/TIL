CALC.createNameSpace('CALC.memento.OperationMemento');

CALC.memento.OperationMemento = (function () {
  var OperationMemento;

  OperationMemento = function (firstNumber, secondNumber) {
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
  };

  OperationMemento.prototype.getFirstNumber = function () {
    return this.firstNumber;
  };

  OperationMemento.prototype.getSecondNumber = function () {
    return this.secondNumber;
  };

  OperationMemento.prototype.toString = function () {
    return 'OperationMemento';
  };

  return OperationMemento;
})();
