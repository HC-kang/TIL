PAINTER.createNameSpace('PAINTER.controller.PainterController');

PAINTER.controller.PainterController = (function () {
  var IContext = PAINTER.controller.state.IContext;
  var PainterController;

  PainterController = function () {
    this.painterModel = null;
    this.painterView = null;
  };

  PainterController.prototype = Object.create(IContext.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: PainterController,
    },
  });

  PainterController.prototype.controlPress = function (mouseX, mouseY) {
    var state = this.painterModel.getState();
    state.press(this, mouseX, mouseY);
  };

  PainterController.prototype.controlRelease = function (mouseX, mouseY) {
    var state = this.painterModel.getState();
    state.release(this, mouseX, mouseY);
  };

  PainterController.prototype.controlDrag = function (mouseX, mouseY) {
    var state = this.painterModel.getState();
    state.drag(this, mouseX, mouseY);

    this.painterView.drawing();
  };

  PainterController.prototype.drawing = function (ctx) {
    var state = this.painterModel.getState();
    state.drawing(this, ctx);
  };

  PainterController.prototype.setPainterView = function (painterView) {
    this.painterView = painterView;
  };

  PainterController.prototype.setPainterModel = function (painterModel) {
    this.painterModel = painterModel;
  };

  PainterController.prototype.setState = function (state) {
    this.painterModel.setState(state);
  };

  PainterController.prototype.changeState = function (state) {};

  PainterController.prototype.repaintView = function () {
    this.painterView.repaint();
  };

  PainterController.prototype.addPiece = function (piece) {
    this.painterModel.addPiece(piece);
  };

  PainterController.prototype.toString = function () {
    return 'PainterController';
  };

  return PainterController;
})();
