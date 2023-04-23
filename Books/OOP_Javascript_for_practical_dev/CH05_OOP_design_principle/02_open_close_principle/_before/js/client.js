CALC.createNameSpace('CALC.ocp.before.Client');

CALC.ocp.before.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var before = CALC.ocp.before;

    var calculator = new before.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new before.AddOperation();
    calculator.setAddOperation(operation);

    var answer = calculator.add(firstNumber, secondNumber);

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new before.SubtractOperation();
    calculator.setSubtractOperation(operation);

    answer = calculator.subtract(firstNumber, secondNumber);

    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new before.MultiplyOperation();
    calculator.setMultiplyOperation(operation);

    answer = calculator.multiply(firstNumber, secondNumber);

    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);

    operation = new before.DivideOperation();
    calculator.setDivideOperation(operation);

    answer = calculator.divide(firstNumber, secondNumber);

    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
