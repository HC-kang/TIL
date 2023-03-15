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

  AbstractPiece.prototype.setStrokeColor = function (strokeColor) {
    this.strokeColor = strokeColor;
  };

  AbstractPiece.prototype.setStrokeWidth = function (strokeWidth) {
    this.strokeWidth = strokeWidth;
  };

  AbstractPiece.prototype.setFillColor = function (fillColor) {
    this.fillColor = fillColor;
  };

  AbstractPiece.prototype.applyStyle = function (ctx) {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;
  };

  AbstractPiece.prototype.toString = function () {
    return "AbstractPiece";
  };

  return AbstractPiece;
})();
