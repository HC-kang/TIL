PAINTER.createNameSpace('PAINTER.controller.state.LineState');

PAINTER.controller.state.LineState = (function () {
  var ImplState = PAINTER.controller.state.ImplState;

  var LineState;

  LineState = function () {
    ImplState.call(this);

    if (LineState._instance) {
      return LineState._instance;
    }

    LineState._instance = this;
  };

  LineState.prototype = Object.create(ImplState.prototype, {
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

  LineState.prototype.createPieceManager = function () {
    return new PAINTER.controller.manager.LinePieceManager();
  };

  LineState.prototype.toString = function () {
    return 'LineState';
  };

  return LineState;
})();
