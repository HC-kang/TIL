CALC.createNameSpace('CALC.interpreter.CalcContext');

CALC.interpreter.CalcContext = (function () {
  var CalcContext;

  CalcContext = function (text) {
    this.tokenizer = new CALC.interpreter.CalcTokenizer(text);
    this.currentToken = null;
  };

  CalcContext.prototype.getCurrentTokenAndGoToNext = function () {
    if (this.tokenizer.hasMoreElements()) {
      this.currentToken = this.tokenizer.getCurrentTokenAndGoToNext();
    } else {
      this.currentToken = null;
    }

    return this.currentToken;
  };

  CalcContext.prototype.skipToken = function (token) {
    if (token !== this.currentToken.getToken()) {
      throw new Error(
        'Warning: ' +
          token +
          ' is expected, but ' +
          this.currentToken +
          'is found'
      );
    }
  };

  CalcContext.prototype.print = function () {
    this.tokenizer.print();
  };

  CalcContext.prototype.getCurrentToken = function () {
    return this.tokenizer.getCurrentToken();
  };

  CalcContext.prototype.toString = function () {
    return 'CalcContext';
  };

  return CalcContext;
})();
