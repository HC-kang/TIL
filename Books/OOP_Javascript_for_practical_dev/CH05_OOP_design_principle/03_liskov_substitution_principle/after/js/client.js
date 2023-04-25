CALC.createNameSpace('CALC.lsp.after.Client');

CALC.lsp.after.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var after = CALC.lsp.after;

    var calculator = new after.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new after.AddOperation();
    var answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new after.SubtractOperation();
    answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new after.MultiplyOperation();
    answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);

    secondNumber = 0;
    operation = new after.DivideOperation();
    answer = calculator.calculate(operation, firstNumber, secondNumber);
    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
