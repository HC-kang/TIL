CALC.createNameSpace('CALC.memento.OperationOriginator');

CALC.memento.OperationOriginator = (function () {
  var OperationMemento = CALC.memento.OperationMemento;

  var OperationOriginator;

  OperationOriginator = function () {
    this.firstNumber = 0;
    this.secondNumber = 0;
  };

  OperationOriginator.prototype.createMemento = function () {
    return new OperationMemento(this.firstNumber, this.secondNumber);
  };

  OperationOriginator.prototype.setMemento = function (memento) {
    this.firstNumber = memento.getFirstNumber();
    this.secondNumber = memento.getSecondNumber();
  };

  OperationOriginator.prototype.printOperations = function () {
    console.log(
      this.firstNumber +
        ' + ' +
        this.secondNumber +
        ' = ' +
        (this.firstNumber + this.secondNumber)
    );
    console.log(
      this.firstNumber +
        ' - ' +
        this.secondNumber +
        ' = ' +
        (this.firstNumber - this.secondNumber)
    );
    console.log(
      this.firstNumber +
        ' * ' +
        this.secondNumber +
        ' = ' +
        this.firstNumber * this.secondNumber
    );
    console.log(
      this.firstNumber +
        ' / ' +
        this.secondNumber +
        ' = ' +
        this.firstNumber / this.secondNumber
    );
  };

  OperationOriginator.prototype.setFirstNumber = function (firstNumber) {
    this.firstNumber = firstNumber;
  };

  OperationOriginator.prototype.setSecondNumber = function (secondNumber) {
    this.secondNumber = secondNumber;
  };

  OperationOriginator.prototype.toString = function () {
    return 'OperationOriginator';
  };

  return OperationOriginator;
})();
