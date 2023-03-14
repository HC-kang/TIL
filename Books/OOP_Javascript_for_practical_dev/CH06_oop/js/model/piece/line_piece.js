PAINTER.createNameSpace("PAINTER.model.piece.LinePiece");

PAINTER.model.piece.LinePiece = (function () {
  var AbstractPiece = PAINTER.model.piece.AbstractPiece;
  var LinePiece;

  LinePiece = function (startX, startY, endX, endY) {
    AbstractPiece.call(this);

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  };

  LinePiece.prototype = Object.create(AbstractPiece.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: LinePiece,
    }
  });

  LinePiece.prototype.draw = function (ctx) {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  };

  LinePiece.prototype.toString = function () {
    return "LinePiece";
  };

  return LinePiece;
})();
