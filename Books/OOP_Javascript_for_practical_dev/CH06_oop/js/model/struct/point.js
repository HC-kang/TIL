PAINTER.createNameSpace('PAINTER.model.struct.Point');

PAINTER.model.struct.Point = (function () {
  var Point;

  Point = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Point.prototype.toString = function () {
    return 'Point';
  };

  return Point;
})();
