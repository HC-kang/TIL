PAINTER.createNameSpace('PAINTER.controller.state.RectangleState');

PAINTER.controller.state.RectangleState = (function () {
  var IState = PAINTER.controller.state.IState;

  var RectangleState;

  RectangleState = function () {
    var RectanglePieceManager =
      PAINTER.controller.manager.RectanglePieceManager;

    IState.call(this);

    if (RectangleState._instance) {
      return RectangleState._instance;
    }

    this.rectangleManager = new RectanglePieceManager();

    RectangleState._instance = this;
  };

  RectangleState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: RectangleState,
    },
  });

  RectangleState.getInstance = function () {
    if (!RectangleState._instance) {
      RectangleState._instance = new RectangleState();
    }
    return RectangleState._instance;
  };

  RectangleState.prototype.press = function (context, mouseX, mouseY) {
    this.rectangleManager.setStartXY(mouseX, mouseY);
  };

  RectangleState.prototype.drag = function (context, mouseX, mouseY) {
    this.rectangleManager.setEndXY(mouseX, mouseY);

    context.repaintView();
  };

  RectangleState.prototype.release = function (context, mouseX, mouseY) {
    this.rectangleManager.setEndXY(mouseX, mouseY);
    var piece = this.rectangleManager.createPiece();
    this.rectangleManager.reset();

    context.addPiece(piece);
  };

  RectangleState.prototype.drawing = function (context, ctx) {
    if (this.rectangleManager.isValid()) {
      this.rectangleManager.drawing(ctx);
    }
  };

  RectangleState.prototype.toString = function () {
    return 'RectangleState';
  };

  return RectangleState;
})();
