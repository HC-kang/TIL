PAINTER.createNameSpace("PAINTER.model.piece.AbstractPiece");

PAINTER.model.piece.AbstractPiece = (function () {
  var AbstractPiece;

  AbstractPiece = function () {
    this.strokeColor = "red";
    this.strokeWidth = 10;

    this.fillColor = "blue";
  };

  AbstractPiece.prototype.draw = function (ctx) {
    throw new Error("this method must be implemented by subclass");
  };

  AbstractPiece.prototype.toString = function () {
    return "AbstractPiece";
  };

  return AbstractPiece;
})();
