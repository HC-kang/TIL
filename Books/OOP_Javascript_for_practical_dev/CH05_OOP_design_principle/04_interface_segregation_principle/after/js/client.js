CALC.createNameSpace('CALC.isp.after.Client');

CALC.isp.after.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var after = CALC.isp.after;

    var calculator = new after.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new after.AddOperation();

    var calcClient = new after.CalcClient();

    var answer = calcClient.request(
      calculator,
      operation,
      firstNumber,
      secondNumber
    );

    console.log('Answer: ' + answer);

    var displayClient = new after.DisplayClient();

    displayClient.request(calculator, operation, firstNumber, secondNumber);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
