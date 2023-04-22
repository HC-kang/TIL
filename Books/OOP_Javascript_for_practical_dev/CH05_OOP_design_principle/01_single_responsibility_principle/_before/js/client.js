CALC.createNameSpace('CALC.sip.before.Client');

CALC.sip.before.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var before = CALC.sip.before;

    var calculator = new before.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operator = '+';
    var answer = calculator.calculate(operator, firstNumber, secondNumber);

    console.log(firstNumber + operator + secondNumber + ' = ' + answer);

    operator = '-';
    answer = calculator.calculate(operator, firstNumber, secondNumber);

    console.log(firstNumber + operator + secondNumber + ' = ' + answer);

    operator = '*';
    answer = calculator.calculate(operator, firstNumber, secondNumber);

    console.log(firstNumber + operator + secondNumber + ' = ' + answer);

    operator = '/';
    answer = calculator.calculate(operator, firstNumber, secondNumber);

    console.log(firstNumber + operator + secondNumber + ' = ' + answer);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
