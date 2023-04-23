CALC.createNameSpace('CALC.ocp.before.Client');

CALC.ocp.before.Client = (function () {
  var Client;

  Client = function () {}

  Client.prototype.main = function () {
    var after = CALC.ocp.before

    var calculator = new after.Calculator();
  }
})();