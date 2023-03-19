PAINTER.createNameSpace('PAINTER.controller.state.FreePathState');

PAINTER.controller.state.FreePathState = (function () {
  var IState = PAINTER.controller.state.IState;

  var FreePathState;

  FreePathState = function (startX, startY, endX, endY) {
    var FreePathPieceManager = PAINTER.controller.manager.FreePathPieceManager;

    IState.call(this);

    if (FreePathState._instance) {
      return FreePathState._instance;
    }

    this.freePathManager = new FreePathPieceManager();

    FreePathState._instance = this;
  };

  FreePathState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: FreePathState,
    },
  });

  FreePathState.getInstance = function () {
    if (!FreePathState._instance) {
      FreePathState._instance = new FreePathState();
    }

    return FreePathState._instance;
  };

  FreePathState.prototype.press = function (context, mouseX, mouseY) {
    this.freePathManager.setStartXY(mouseX, mouseY);
  };

  FreePathState.prototype.drag = function (context, mouseX, mouseY) {
    this.freePathManager.setEndXY(mouseX, mouseY);

    context.repaintView();
  };

  FreePathState.prototype.release = function (context, mouseX, mouseY) {
    this.freePathManager.setEndXY(mouseX, mouseY);
    var piece = this.freePathManager.createPiece();
    this.freePathManager.reset();

    context.addPiece(piece);
  };

  FreePathState.prototype.drawing = function (context, ctx) {
    if (this.freePathManager.isValid()) {
      this.freePathManager.drawing(ctx);
    }
  };

  FreePathState.prototype.toString = function () {
    return 'FreePathState';
  };

  return FreePathState;
})();
