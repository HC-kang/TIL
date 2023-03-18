PAINTER.createNameSpace('PAINTER.controller.manager.LinePieceManager');

PAINTER.controller.manager.LinePieceManager = (function () {
  var AbstractPieceManager = PAINTER.controller.manager.AbstractPieceManager;

  var LinePieceManager;

  LinePieceManager = function (startX, startY, endX, endY) {
    AbstractPieceManager.call(this);

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  };

  LinePieceManager.prototype = Object.create(AbstractPieceManager.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: LinePieceManager,
    },
  });

  LinePieceManager.prototype.setStartXY = function (startX, startY) {
    this.startX = startX;
    this.startY = startY;
  };

  LinePieceManager.prototype.setEndXY = function (endX, endY) {
    this.endX = endX;
    this.endY = endY;
  };

  LinePieceManager.prototype.isValid = function () {
    return this.startX !== this.endX || this.startY !== this.endY;
  };

  LinePieceManager.prototype.createPiece = function () {
    var LinePiece = PAINTER.model.piece.LinePiece;

    return new LinePiece(this.startX, this.startY, this.endX, this.endY);
  };

  LinePieceManager.prototype.drawing = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  };

  LinePieceManager.prototype.reset = function () {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
  };

  LinePieceManager.prototype.toString = function () {
    return 'LinePieceManager';
  };

  return LinePieceManager;
})();
