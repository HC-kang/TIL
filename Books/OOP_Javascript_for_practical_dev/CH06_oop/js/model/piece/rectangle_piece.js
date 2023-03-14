PAINTER.createNameSpace("PAINTER.model.piece.RectanglePiece");

PAINTER.model.piece.RectanglePiece = (function () {
  var RectanglePiece;

  RectanglePiece = function (x, y, width, height) {
    this.strokeColor = "red";
    this.strokeWidth = 10;

    this.fillColor = "blue";

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  RectanglePiece.prototype.drawRect = function (ctx) {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  RectanglePiece.prototype.toString = function () {
    return "RectanglePiece";
  };

  return RectanglePiece;
})();
