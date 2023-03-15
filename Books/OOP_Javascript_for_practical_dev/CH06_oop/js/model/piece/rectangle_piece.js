PAINTER.createNameSpace("PAINTER.model.piece.RectanglePiece");

PAINTER.model.piece.RectanglePiece = (function () {
  var AbstractPiece = PAINTER.model.piece.AbstractPiece;
  var RectanglePiece;

  RectanglePiece = function (x, y, width, height) {
    AbstractPiece.call(this);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  RectanglePiece.prototype = Object.create(AbstractPiece.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: RectanglePiece,
    }
  });

  RectanglePiece.prototype.draw = function (ctx) {
    this.applyStyle(ctx);

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  RectanglePiece.prototype.toString = function () {
    return "RectanglePiece";
  };

  return RectanglePiece;
})();
