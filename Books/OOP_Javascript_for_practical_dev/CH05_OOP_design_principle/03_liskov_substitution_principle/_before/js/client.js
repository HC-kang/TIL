CALC.createNameSpace('CALC.lsp.before.Client');

CALC.lsp.before.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var before = CALC.lsp.before;

    var calculator = new before.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new before.AddOperation();
    var answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new before.SubtractOperation();
    answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new before.MultiplyOperation();
    answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
