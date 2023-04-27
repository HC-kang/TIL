CALC.createNameSpace('CALC.dip.after.Client');

CALC.dip.after.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var after = CALC.dip.after;

    var calculator = new after.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new after.AddOperation();
    calculator.setOperation(operation);
    var answer = calculator.calculate(firstNumber, secondNumber);
    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new after.SubtractOperation();
    calculator.setOperation(operation);
    answer = calculator.calculate(firstNumber, secondNumber);
    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new after.MultiplyOperation();
    calculator.setOperation(operation);
    answer = calculator.calculate(firstNumber, secondNumber);
    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);

    operation = new after.DivideOperation();
    calculator.setOperation(operation);
    answer = calculator.calculate(firstNumber, secondNumber);
    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
