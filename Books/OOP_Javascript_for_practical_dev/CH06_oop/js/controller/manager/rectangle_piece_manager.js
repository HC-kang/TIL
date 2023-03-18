PAINTER.createNameSpace('PAINTER.controller.manager.RectanglePieceManager');

PAINTER.controller.manager.RectanglePieceManager = (function () {
  var AbstractBoundingPieceManager =
    PAINTER.controller.manager.AbstractBoundingPieceManager;
  var RectanglePieceManager;

  RectanglePieceManager = function (startX, startY, endX, endY) {
    AbstractBoundingPieceManager.call(this);
  };

  RectanglePieceManager.prototype = Object.create(
    AbstractBoundingPieceManager.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: RectanglePieceManager,
      },
    }
  );

  RectanglePieceManager.prototype.drawing = function (ctx) {
    var w = this.endX - this.startX;
    var h = this.endY - this.startY;

    ctx.fillRect(this.startX, this.startY, w, h);
    ctx.strokeRect(this.startX, this.startY, w, h);
  };

  RectanglePieceManager.prototype.createPiece = function () {
    var RectanglePiece = PAINTER.model.piece.RectanglePiece;

    return new RectanglePiece(
      this.startX,
      this.startY,
      this.endX - this.startX,
      this.endY - this.startY
    );
  };

  RectanglePieceManager.prototype.toString = function () {
    return 'RectanglePieceManager';
  };

  return RectanglePieceManager;
})();
