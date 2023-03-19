PAINTER.createNameSpace('PAINTER.controller.state.ImplState');

PAINTER.controller.state.ImplState = (function () {
  var IState = PAINTER.controller.state.IState;

  var ImplState;

  ImplState = function (startX, startY, endX, endY) {
    IState.call(this);
    this.pieceManager = this.createPieceManager();
  };

  ImplState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: ImplState,
    },
  });

  ImplState.prototype.createPieceManager = function () {
    throw new Error('You have to implement the method createPieceManager!');
  };

  ImplState.prototype.press = function (context, mouseX, mouseY) {
    this.pieceManager.setStartXY(mouseX, mouseY);
  };

  ImplState.prototype.drag = function (context, mouseX, mouseY) {
    this.pieceManager.setEndXY(mouseX, mouseY);

    context.repaintView();
  };

  ImplState.prototype.release = function (context, mouseX, mouseY) {
    this.pieceManager.setEndXY(mouseX, mouseY);
    var piece = this.pieceManager.createPiece();
    this.pieceManager.reset();

    context.addPiece(piece);
  };

  ImplState.prototype.drawing = function (context, ctx) {
    if (this.pieceManager.isValid()) {
      this.pieceManager.drawing(ctx);
    }
  };

  ImplState.prototype.toString = function () {
    return 'ImplState';
  };

  return ImplState;
})();
