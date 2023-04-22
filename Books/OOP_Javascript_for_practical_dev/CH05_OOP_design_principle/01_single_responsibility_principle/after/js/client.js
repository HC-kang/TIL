CALC.createNameSpace('CALC.sip.after.Client');

CALC.sip.after.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var after = CALC.sip.after;

    var calculator = new after.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new after.AddOperation();
    calculator.setAddOperation(operation);

    var answer = calculator.calculate('+', firstNumber, secondNumber);

    console.log(firstNumber + ' + ' + secondNumber + ' = ' + answer);

    operation = new after.SubtractOperation();
    calculator.setSubtractOperation(operation);

    answer = calculator.calculate('-', firstNumber, secondNumber);

    console.log(firstNumber + ' - ' + secondNumber + ' = ' + answer);

    operation = new after.MultiplyOperation();
    calculator.setMultiplyOperation(operation);

    answer = calculator.calculate('*', firstNumber, secondNumber);

    console.log(firstNumber + ' * ' + secondNumber + ' = ' + answer);

    operation = new after.DivideOperation();
    calculator.setDivideOperation(operation);

    answer = calculator.calculate('/', firstNumber, secondNumber);

    console.log(firstNumber + ' / ' + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
