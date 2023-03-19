PAINTER.createNameSpace('PAINTER.controller.state.EllipseState');

PAINTER.controller.state.EllipseState = (function () {
  var IState = PAINTER.controller.state.IState;

  var EllipseState;

  EllipseState = function (startX, startY, endX, endY) {
    var EllipsePieceManager = PAINTER.controller.manager.EllipsePieceManager;

    IState.call(this);

    if (EllipseState._instance) {
      return EllipseState._instance;
    }

    this.ellipseManager = new EllipsePieceManager();

    EllipseState._instance = this;
  };

  EllipseState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: EllipseState,
    },
  });

  EllipseState.prototype = Object.create(IState.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: EllipseState,
    },
  });

  EllipseState.getInstance = function () {
    if (!EllipseState._instance) {
      EllipseState._instance = new EllipseState();
    }

    return EllipseState._instance;
  };

  EllipseState.prototype.press = function (context, mouseX, mouseY) {
    this.ellipseManager.setStartXY(mouseX, mouseY);
  };

  EllipseState.prototype.drag = function (context, mouseX, mouseY) {
    this.ellipseManager.setEndXY(mouseX, mouseY);

    context.repaintView();
  };

  EllipseState.prototype.release = function (context, mouseX, mouseY) {
    this.ellipseManager.setEndXY(mouseX, mouseY);
    var piece = this.ellipseManager.createPiece();
    this.ellipseManager.reset();

    context.addPiece(piece);
  };

  EllipseState.prototype.drawing = function (context, ctx) {
    if (this.ellipseManager.isValid()) {
      this.ellipseManager.drawing(ctx);
    }
  };

  EllipseState.prototype.toString = function () {
    return 'EllipseState';
  };

  return EllipseState;
})();
