PAINTER.createNameSpace('PAINTER.controller.manager.AbstractPieceManager');

PAINTER.controller.manager.AbstractPieceManager = (function () {
  var AbstractPieceManager;

  AbstractPieceManager = function () {};

  AbstractPieceManager.prototype.setStartXY = function (startX, startY) {
    throw new Error('You have to implement the method setStartXY!');
  };

  AbstractPieceManager.prototype.setEndXY = function (endX, endY) {
    throw new Error('You have to implement the method setEndXY!');
  };

  AbstractPieceManager.prototype.drawing = function (ctx) {
    throw new Error('You have to implement the method drawing!');
  };

  AbstractPieceManager.prototype.isValid = function () {
    throw new Error('You have to implement the method isValid!');
  };

  AbstractPieceManager.prototype.createPiece = function () {
    throw new Error('You have to implement the method createPiece!');
  };

  AbstractPieceManager.prototype.reset = function () {
    throw new Error('You have to implement the method reset!');
  };

  AbstractPieceManager.prototype.toString = function () {
    return 'AbstractPieceManager';
  };

  return AbstractPieceManager;
})();
