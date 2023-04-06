CALC.createNameSpace('CALC.flyweight.FontInfo');

CALC.flyweight.FontInfo = (function () {
  var FontInfo;

  FontInfo = function (name, size) {
    this.name = name;
    this.size = size;
  };

  FontInfo.prototype.getName = function () {
    return this.name;
  };

  FontInfo.prototype.setName = function (name) {
    this.name = name;
  };

  FontInfo.prototype.getSize = function () {
    return this.size;
  };

  FontInfo.prototype.setSize = function (size) {
    this.size = size;
  };

  FontInfo.prototype.toString = function () {
    return '(' + this.name + ', ' + this.size + ')';
  };

  return FontInfo;
})();
