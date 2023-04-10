CALC.createNameSpace('CALC.interpreter.CalcToken');

CALC.interpreter.CalcToken = (function () {
  var CalcTokenizer = CALC.interpreter.CalcTokenizer;

  var CalcToken;

  CalcToken = function (type, token) {
    this.type = type;
    this.token = token;
  }

  CalcToken.FUNCTION = 1;
  CalcToken.NUMBER = 2;
  CalcToken.DELIM = 3;
  CalcToken.VARIABLE = 4;

  CalcToken.prototype.getType = function () {
    return this.type;
  }

  CalcToken.prototype.getToken = function () {
    return this.token;
  }

  CalcToken.prototype.getTypeDescription = function (type) {
    if (type === CalcToken.FUNCTION) {
      return 'FUNCTION';
    }
    if (type === CalcToken.NUMBER) {
      return 'NUMBER';
    }
    if (type === CalcToken.DELIM) {
      return 'DELIM';
    }
    if (type === CalcToken.VARIABLE) {
      return 'VARIABLE';
    }

    return null;
  };

  CalcToken.prototype.toString = function () {
    return this.getTypeDescription(this.type) + ': ' + this.token;
  }

  return CalcToken;
})()