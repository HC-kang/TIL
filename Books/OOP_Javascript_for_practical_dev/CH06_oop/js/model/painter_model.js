PAINTER.createNameSpace("PAINTER.model.PainterModel");

PAINTER.model.PainterModel = (function () {
  var PainterModel;

  PainterModel = function () {
    this.pieces = [];
  };

  PainterModel.prototype.drawPieces = function (ctx) {
    var RectanglePiece = PAINTER.model.piece.RectanglePiece;
    var LinePiece = PAINTER.model.piece.LinePiece;

    let EllipsePiece = PAINTER.model.piece.EllipsePiece;

    var size = this.pieces.length;

    for (var i = 0; i < size; i++) {
      if (this.pieces[i] instanceof LinePiece) {
        this.pieces[i].drawLine(ctx);
      } else if (this.pieces[i] instanceof RectanglePiece) {
        this.pieces[i].drawRect(ctx);
      } else if (this.pieces[i] instanceof EllipsePiece) {
        this.pieces[i].drawEllipse(ctx);
      }
    }
  };

  PainterModel.prototype.addPiece = function (piece) {
    this.pieces.push(piece);
  };

  PainterModel.prototype.toString = function () {
    return "PainterModel";
  };

  return PainterModel;
})();
