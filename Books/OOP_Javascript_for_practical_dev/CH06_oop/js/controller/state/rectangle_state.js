PAINTER.createNameSpace('PAINTER.controller.state.RectangleState');

PAINTER.controller.state.RectangleState = (function () {
  var ImplState = PAINTER.controller.state.ImplState;

  var RectangleState;

  RectangleState = function () {
    var RectanglePieceManager =
      PAINTER.controller.manager.RectanglePieceManager;

    ImplState.call(this);

    if (RectangleState._instance) {
      return RectangleState._instance;
    }

    RectangleState._instance = this;
  };

  RectangleState.prototype = Object.create(ImplState.prototype, {
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

  RectangleState.prototype.createPieceManager = function () {
    return new PAINTER.controller.manager.RectanglePieceManager();
  }
  
  RectangleState.prototype.toString = function () {
    return 'RectangleState';
  };

  return RectangleState;
})();
