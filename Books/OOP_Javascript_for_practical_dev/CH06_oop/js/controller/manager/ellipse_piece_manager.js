PAINTER.createNameSpace('PAINTER.controller.manager.EllipsePieceManager');

PAINTER.controller.manager.EllipsePieceManager = (function () {
  var AbstractBoundingPieceManager =
    PAINTER.controller.manager.AbstractBoundingPieceManager;
  var EllipsePieceManager;

  EllipsePieceManager = function (startX, startY, endX, endY) {
    AbstractBoundingPieceManager.call(this);
  };

  EllipsePieceManager.prototype = Object.create(
    AbstractBoundingPieceManager.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: EllipsePieceManager,
      },
    }
  );

  EllipsePieceManager.prototype.drawing = function (ctx) {
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;

    var w = this.endX - this.startX;
    var h = this.endY - this.startY;

    EllipsePiece.drawEllipseByBezierCurve(ctx, this.startX, this.startY, w, h);
  };

  EllipsePieceManager.prototype.createPiece = function () {
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;

    return new EllipsePiece(
      this.startX,
      this.startY,
      this.endX - this.startX,
      this.endY - this.startY
    );
  };

  EllipsePieceManager.prototype.toString = function () {
    return 'EllipsePieceManager';
  };

  return EllipsePieceManager;
})();
