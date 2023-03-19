PAINTER.createNameSpace('PAINTER.controller.state.EllipseState');

PAINTER.controller.state.EllipseState = (function () {
  var ImplState = PAINTER.controller.state.ImplState;

  var EllipseState;

  EllipseState = function (startX, startY, endX, endY) {
    ImplState.call(this);

    if (EllipseState._instance) {
      return EllipseState._instance;
    }

    EllipseState._instance = this;
  };

  EllipseState.prototype = Object.create(ImplState.prototype, {
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

  EllipseState.prototype.createPieceManager = function () {
    return new PAINTER.controller.manager.EllipsePieceManager();
  };

  EllipseState.prototype.toString = function () {
    return 'EllipseState';
  };

  return EllipseState;
})();
