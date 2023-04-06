CALC.createNameSpace('CALC.flyweight.FlyweightConstants');

CALC.flyweight.FlyweightConstants = (function () {
  var FontInfo = CALC.flyweight.FontInfo;

  var FlyweightConstants;

  FlyweightConstants = function () {};

  FlyweightConstants.NUMBER_STYLE_NAME = 'number';
  FlyweightConstants.ANSWER_STYLE_NAME = 'answer';

  FlyweightConstants.COLUMN_WIDTH = 50;
  FlyweightConstants.ROW_HEIGHT = 50;

  FlyweightConstants.OPERATORS = ['+', '-', '*', '/'];
  FlyweightConstants.EQUAL_CHAR = '=';

  FlyweightConstants.DEFAULT_NUMBER_FONT_INFO = new FontInfo('Times', 18);
  FlyweightConstants.DEFAULT_ANSWER_FONT_INFO = new FontInfo('Times', 26);

  FlyweightConstants.prototype.toString = function () {
    return 'FlyweightConstants';
  };

  return FlyweightConstants;
})();
