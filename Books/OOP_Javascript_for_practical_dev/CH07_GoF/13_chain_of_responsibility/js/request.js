CALC.createNameSpace('CALC.chain.Request');

CALC.chain.Request = (function () {
  var Request;

  Request = function (expression) {
    this.expression = expression;
  };

  Request.prototype.getExpression = function () {
    return this.expression;
  };

  Request.prototype.getFirstNumber = function (operator) {
    var operatorIndex = this.expression.indexOf(operator);

    var firstNumber = this.expression.substring(0, operatorIndex);
    return parseInt(firstNumber, 10); // 10진수로 명시
  };

  Request.prototype.getSecondNumber = function (operator) {
    var operatorIndex = this.expression.indexOf(operator);

    var secondNumber = this.expression.substring(operatorIndex + 1);
    return parseInt(secondNumber, 10);
  };

  Request.prototype.toString = function () {
    return 'Request';
  };

  return Request;
})();
