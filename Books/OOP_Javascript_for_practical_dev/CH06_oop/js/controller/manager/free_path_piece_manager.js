PAINTER.createNameSpace('PAINTER.controller.manager.FreePathPieceManager');

PAINTER.controller.manager.FreePathPieceManager = (function () {
  var AbstractPieceManager = PAINTER.controller.manager.AbstractPieceManager;
  var Point = PAINTER.model.struct.Point;

  var FreePathPieceManager;

  FreePathPieceManager = function (startX, startY, endX, endY) {
    AbstractPieceManager.call(this);

    this.points = [];
  };

  FreePathPieceManager.prototype = Object.create(
    AbstractPieceManager.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: FreePathPieceManager,
      },
    }
  );

  FreePathPieceManager.prototype.setStartXY = function (startX, startY) {
    this.points.push(new Point(startX, startY));
  };

  FreePathPieceManager.prototype.setEndXY = function (endX, endY) {
    this.points.push(new Point(endX, endY));
  };

  FreePathPieceManager.prototype.isValid = function () {
    return this.points.length > 1;
  };

  FreePathPieceManager.prototype.createPiece = function () {
    var FreePathPiece = PAINTER.model.piece.FreePathPiece;

    return new FreePathPiece(this.points);
  };

  FreePathPieceManager.prototype.drawing = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    for (var i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    ctx.stroke();
  };

  FreePathPieceManager.prototype.reset = function () {
    this.points = [];
  };

  FreePathPieceManager.prototype.toString = function () {
    return 'FreePathPieceManager';
  };

  return FreePathPieceManager;
})();
