PAINTER.createNameSpace('PAINTER.controller.state.IState');

PAINTER.controller.state.IState = (function () {
  var IState;

  IState = function () {};

  IState.prototype.press = function (context, mouseX, mouseY) {
    throw new Error('You have to implement the method press!');
  };

  IState.prototype.drag = function (context, mouseX, mouseY) {
    throw new Error('You have to implement the method drag!');
  };

  IState.prototype.release = function (context, mouseX, mouseY) {
    throw new Error('You have to implement the method release!');
  };

  IState.prototype.drawing = function (context, ctx) {
    throw new Error('You have to implement the method drawing!');
  };

  IState.prototype.toString = function () {
    return 'IState';
  };

  return IState;
})();
