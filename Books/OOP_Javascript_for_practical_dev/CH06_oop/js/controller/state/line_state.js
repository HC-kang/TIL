PAINTER.createNameSpace('PAINTER.controller.state.LineState');

PAINTER.controller.state.LineState = (function () {
  var IState = PAINTER.controller.state.IState;

  var LineState;

  LineState = function () {
    var LinePieceManager = PAINTER.controller.manager.LinePieceManager;

    IState.call(this);

    if (LineState._instance) {
      return LineState._instance;
    }

    this.lineManager = new LinePieceManager();

    LineState._instance = this;
  };

  LineState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      value: LineState,
      writable: true,
    },
  });

  LineState.getInstance = function () {
    if (!LineState._instance) {
      LineState._instance = new LineState();
    }

    return LineState._instance;
  };

  LineState.prototype.press = function (context, mouseX, mouseY) {
    this.lineManager.setStartXY(mouseX, mouseY);
  };

  LineState.prototype.drag = function (context, mouseX, mouseY) {
    this.lineManager.setEndXY(mouseX, mouseY);

    context.repaintView();
  };

  LineState.prototype.release = function (context, mouseX, mouseY) {
    this.lineManager.setEndXY(mouseX, mouseY);
    var piece = this.lineManager.createPiece();
    this.lineManager.reset();

    context.addPiece(piece);
  };

  LineState.prototype.drawing = function (context, ctx) {
    if (this.lineManager.isValid()) {
      this.lineManager.drawing(ctx);
    }
  };

  LineState.prototype.toString = function () {
    return 'LineState';
  };

  return LineState;
})();
