CALC.createNameSpace('CALC.dip.before.Client');

CALC.dip.before.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var before = CALC.dip.before;

    var calculator = new before.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new before.AddOperation();
    calculator.setAddOperation(operation);
    var answer = calculator.calculate('+', firstNumber, secondNumber);
    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new before.SubtractOperation();
    calculator.setSubtractOperation(operation);
    answer = calculator.calculate('-', firstNumber, secondNumber);
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new before.MultiplyOperation();
    calculator.setMultiplyOperation(operation);
    answer = calculator.calculate('*', firstNumber, secondNumber);
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
