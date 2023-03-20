PAINTER.createNameSpace('PAINTER.controller.state.IContext');

PAINTER.controller.state.IContext = (function () {
  var IContext;

  IContext = function () {};

  IContext.prototype.changeState = function (state) {
    throw new Error('You have to implement the method changeState!');
  };

  IContext.prototype.repaintView = function () {
    throw new Error('You have to implement the method repaintView!');
  };

  IContext.prototype.addPiece = function (piece) {
    throw new Error('You have to implement the method addPiece!');
  };

  IContext.prototype.getStrokeWidth = function () {
    throw new Error('You have to implement the method getStrokeWidth!');
  };

  IContext.prototype.setStrokeWidth = function (value) {
    throw new Error('You have to implement the method setStrokeWidth!');
  };

  IContext.prototype.toString = function () {
    return 'IContext';
  };

  return IContext;
})();
