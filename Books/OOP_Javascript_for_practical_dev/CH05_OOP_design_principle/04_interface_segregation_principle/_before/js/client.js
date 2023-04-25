CALC.createNameSpace('CALC.isp.before.Client');

CALC.isp.before.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.main = function () {
    var before = CALC.isp.before;

    var calculator = new before.Calculator();

    var firstNumber = 100;
    var secondNumber = 20;

    var operation = new before.AddOperation();

    var calcClient = new before.CalcClient();

    var answer = calcClient.request(
      calculator,
      operation,
      firstNumber,
      secondNumber
    );

    console.log('answer = ', answer);

    var displayClient = new before.DisplayClient();

    displayClient.request(calculator, operation, firstNumber, secondNumber);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
