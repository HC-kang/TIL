CALC.createNameSpace('CALC.interpreter.CalcTokenizer');

CALC.interpreter.CalcTokenizer = (function () {
  var CalcTokenizer = CALC.interpreter.CalcTokenizer;
  var CalcToken = CALC.interpreter.CalcToken;

  var CalcTokenizer;

  CalcTokenizer = function (text) {
    this.keywords = ['SQRT', 'FRAC', 'POW', 'ADD', 'SUB', 'MUL', 'DIV'];

    this.tokenList = [];

    this.currentIndex = 0;

    var sb = '';

    var ch;
    for (var i = 0; i < text.length; i++) {
      ch = text.charAt(i);

      if (this.isDelim(ch)) {
        if (/\s/.test(ch) === false) {
          this.tokenList.push(new CalcToken(CalcToken.DELIM, '' + ch));
        }
      } else if (this.isLetter(ch)) {
        sb = '';
        sb += ch;

        for (var k = i + 1; k < text.length; k++) {
          ch = text.charAt(k);
          if (this.isDelim(ch)) {
            i = k - 1;
            break;
          }
          sb += ch;

          i = k;
        }

        this.tokenList.push(new CalcToken(CalcToken.NUMBER, sb.toString()));
      }
    }
  };

  CalcTokenizer.prototype.hasMoreElements = function () {
    return this.currentIndex < this.tokenList.length;
  };

  CalcTokenizer.prototype.getCurrentTokenAndGoToNext = function () {
    return this.tokenList[this.currentIndex++];
  };

  CalcTokenizer.prototype.isFunction = function (variable) {
    for (var i = 0; i < this.keywords.length; i++) {
      if (variable === this.keywords[i]) {
        return true;
      }
    }
    return false;
  };

  CalcTokenizer.prototype.isDelim = function (c) {
    if ('(),'.indexOf(c) != -1) return true;
    return false;
  };

  CalcTokenizer.prototype.isLetter = function (str) {
    return str.length === 1 && str.match(/[a-z]/i);
  };

  CalcTokenizer.prototype.isDigit = function (str) {
    return /^\d+$/.test(str);
  };

  CalcTokenizer.prototpye.print = function () {
    for (var i = 0; i < this.tokenList.size(); i++) {
      console.log(i + ' ' + this.tokenList[i]);
    }
  };

  CalcTokenizer.prototype.getCurrentToken = function () {
    if ((this.currentIndex, this.tokenList.length)) {
      return this.tokenList[this.currentIndex];
    }

    return null;
  };

  CalcTokenizer.prototype.toString = function () {
    return 'CalcTokenizer';
  };

  return CalcTokenizer;
})();
