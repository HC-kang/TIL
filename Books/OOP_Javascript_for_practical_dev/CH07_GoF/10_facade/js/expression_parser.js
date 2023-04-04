CALC.createNameSpace('CALC.facade.ExpressionParser');

CALC.facade.ExpressionParser = (function () {
  var ExpressionParser;

  ExpressionParser = function (value) {
    this.operators = ['+', '-', '*', '/'];
    this.operatorToken = null;
    this.firstNumberToken = null;
    this.secondNumberToken = null;
  };

  ExpressionParser.prototype.getOperatorToken = function () {
    return this.operatorToken;
  };

  ExpressionParser.prototype.getFirstNumberToken = function () {
    return this.firstNumberToken;
  };

  ExpressionParser.prototype.getSecondNumberToken = function () {
    return this.secondNumberToken;
  };

  ExpressionParser.prototype.parse = function (expression) {
    var operatorIndex = -1;

    for (var i = 0; i < this.operators.length; i++) {
      operatorIndex = expression.indexOf(this.operators[i]);
      if (operatorIndex != -1) {
        this.operatorToken = this.operators[i];
        break;
      }
    }

    this.firstNumberToken = expression.substring(0, operatorIndex);
    this.secondNumberToken = expression.substring(operatorIndex + 1);
  };

  ExpressionParser.prototype.toString = function () {
    return 'ExpressionParser';
  };

  return ExpressionParser;
})();
