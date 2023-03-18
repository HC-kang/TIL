PAINTER.createNameSpace(
  'PAINTER.controller.manager.AbstractBoundingPieceManager'
);

PAINTER.controller.manager.AbstractBoundingPieceManager = (function () {
  var AbstractPieceManager = PAINTER.controller.manager.AbstractPieceManager;

  var AbstractBoundingPieceManager;

  AbstractBoundingPieceManager = function (startX, startY, endX, endY) {
    AbstractPieceManager.call(this);

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  };

  AbstractBoundingPieceManager.prototype = Object.create(
    AbstractPieceManager.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: AbstractBoundingPieceManager,
      },
    }
  );

  AbstractBoundingPieceManager.prototype.setStartXY = function (
    startX,
    startY
  ) {
    this.startX = startX;
    this.startY = startY;
  };

  AbstractBoundingPieceManager.prototype.setEndXY = function (endX, endY) {
    this.endX = endX;
    this.endY = endY;
  };

  AbstractBoundingPieceManager.prototype.isValid = function () {
    return this.startX !== this.endX || this.startY !== this.endY;
  };

  AbstractBoundingPieceManager.prototype.reset = function () {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
  };

  AbstractBoundingPieceManager.prototype.toString = function () {
    return 'AbstractBoundingPieceManager';
  };

  return AbstractBoundingPieceManager;
})();
