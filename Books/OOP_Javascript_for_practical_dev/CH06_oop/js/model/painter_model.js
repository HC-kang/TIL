PAINTER.createNameSpace("PAINTER.model.PainterModel");

PAINTER.model.PainterModel = (function () {
  var PainterModel;

  PainterModel = function () {
    this.pieces = [];
  };

  PainterModel.prototype.drawPieces = function (ctx) {
    var size = this.pieces.length;

    for (var i = 0; i < size; i++) {
      this.pieces[i].drawLine(ctx);
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
