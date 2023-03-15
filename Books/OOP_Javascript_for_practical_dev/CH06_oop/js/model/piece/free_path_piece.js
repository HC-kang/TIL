PAINTER.createNameSpace("PAINTER.model.piece.FreePathPiece");

PAINTER.model.piece.FreePathPiece = (function () {
  var AbstractPiece = PAINTER.model.piece.AbstractPiece;

  var FreePathPiece;

  FreePathPiece = function (points) {
    AbstractPiece.call(this);

    this.points = [];

    var point = { x: 0, y: 0 };
    for (var i = 0; i < points.length; i++) {
      this.points.push({ x: points[i].x, y: points[i].y });
    }
  };

  FreePathPiece.prototype = Object.create(AbstractPiece.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: FreePathPiece,
    },
  });

  FreePathPiece.prototype.draw = function (ctx) {
    this.applyStyle(ctx);

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (var i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
  };

  FreePathPiece.prototype.toString = function () {
    return "FreePathPiece";
  };

  return FreePathPiece;
})();
