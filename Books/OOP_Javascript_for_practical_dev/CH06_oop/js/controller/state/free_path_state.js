PAINTER.createNameSpace('PAINTER.controller.state.FreePathState');

PAINTER.controller.state.FreePathState = (function () {
  var ImplState = PAINTER.controller.state.ImplState;

  var FreePathState;

  FreePathState = function (startX, startY, endX, endY) {
    ImplState.call(this);

    if (FreePathState._instance) {
      return FreePathState._instance;
    }

    FreePathState._instance = this;
  };

  FreePathState.prototype = Object.create(ImplState.prototype, {
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

  FreePathState.prototype.createPieceManager = function () {
    return new PAINTER.controller.manager.FreePathPieceManager();
  };

  FreePathState.prototype.toString = function () {
    return 'FreePathState';
  };

  return FreePathState;
})();
