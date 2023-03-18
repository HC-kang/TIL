PAINTER.createNameSpace("PAINTER.model.PainterModel");

PAINTER.model.PainterModel = (function () {
  var IPainterSubject = PAINTER.controller.observer.IPainterSubject;
  var PainterModel;

  PainterModel = function () {
    var LinePieceManager = PAINTER.controller.manager.LinePieceManager;

    this.pieces = [];
    this.observers = [];

    this.pieceManager = new LinePieceManager();
  };

  PainterModel.prototype = Object.create(IPainterSubject.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: PainterModel,
    }
  });

  PainterModel.prototype.drawPieces = function (ctx) {
    var size = this.pieces.length;

    for (var i = 0; i < size; i++) {
      this.pieces[i].draw(ctx);
    }
  };

  PainterModel.prototype.addPiece = function (piece) {
    this.pieces.push(piece);
    this.notifyObservers();
  };

  PainterModel.prototype.getPieces = function () {
    return this.pieces;
  }

  PainterModel.prototype.notifyObservers = function () {
    for (var i = 0; i < this.observers.length; i++) {
      this.observers[i].update();
    }
  };

  PainterModel.prototype.registerObserver = function (observer) {
    this.observers.push(observer);
  };

  PainterModel.prototype.removeObserver = function (observer) {
    var index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.remove(index);
    }
  };

  PainterModel.prototype.getPieceManager = function () {
    return this.pieceManager;
  };

  PainterModel.prototype.setPieceManager = function (pieceManager) {
    this.pieceManager = pieceManager;
  }

  PainterModel.prototype.toString = function () {
    return "PainterModel";
  };

  return PainterModel;
})();
