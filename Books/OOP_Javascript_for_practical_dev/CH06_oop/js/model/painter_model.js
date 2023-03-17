PAINTER.createNameSpace("PAINTER.model.PainterModel");

PAINTER.model.PainterModel = (function () {
  var PainterModel;

  PainterModel = function () {
    var PainterConstants = PAINTER.app.PainterConstants;
    this.pieces = [];
    this.pieceType = PainterConstants.LINE;
  };

  PainterModel.prototype.drawPieces = function (ctx) {
    var size = this.pieces.length;

    for (var i = 0; i < size; i++) {
      this.pieces[i].draw(ctx);
    }
  };

  PainterModel.prototype.addPiece = function (piece) {
    this.pieces.push(piece);
  };

  PainterModel.prototype.getPieceType = function () {
    return this.pieceType;
  };

  PainterModel.prototype.setPieceType = function (pieceType) {
    this.pieceType = pieceType;
  };

  PainterModel.prototype.getPieces = function () {
    return this.pieces;
  }

  PainterModel.prototype.toString = function () {
    return "PainterModel";
  };

  return PainterModel;
})();
