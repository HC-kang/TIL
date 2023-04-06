CALC.createNameSpace('CALC.flyweight.TextStyleFlyweight');

CALC.flyweight.TextStyleFlyweight = (function () {
  var TextStyleFlyweight;

  TextStyleFlyweight = function (fontInfo, color) {
    this.fontInfo = fontInfo;
    this.color = color;
  };

  TextStyleFlyweight.prototype.getFont = function () {
    return this.font;
  };

  TextStyleFlyweight.prototype.getColor = function () {
    return this.color;
  };

  TextStyleFlyweight.prototype.toString = function () {
    return '(' + this.fontInfo.toString() + ', ' + this.color + ')';
  };

  return TextStyleFlyweight;
})();
