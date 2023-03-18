PAINTER.createNameSpace('PAINTER.controller.PainterController');

PAINTER.controller.PainterController = (function () {
  var PainterController;

  PainterController = function () {
    this.painterModel = null;
    this.painterView = null;
  };

  PainterController.prototype.controlPress = function (mouseX, mouseY) {
    var pieceManager = this.painterModel.getPieceManager();
    pieceManager.setStartXY(mouseX, mouseY);
  };

  PainterController.prototype.controlRelease = function (mouseX, mouseY) {
    var pieceManager = this.painterModel.getPieceManager();

    pieceManager.setEndXY(mouseX, mouseY);
    var piece = pieceManager.createPiece();
    pieceManager.reset();

    this.painterModel.addPiece(piece);
  };

  PainterController.prototype.controlDrag = function (mouseX, mouseY) {
    var pieceManager = this.painterModel.getPieceManager();
    pieceManager.setEndXY(mouseX, mouseY);

    this.painterView.drawing();
  };

  PainterController.prototype.drawing = function (ctx) {
    var pieceManager = this.painterModel.getPieceManager();
    if (pieceManager !== null) {
      if (pieceManager.isValid()) {
        pieceManager.drawing(ctx);
      }
    }
  };

  PainterController.prototype.setPainterView = function (painterView) {
    this.painterView = painterView;
  };

  PainterController.prototype.setPainterModel = function (painterModel) {
    this.painterModel = painterModel;
  };

  PainterController.prototype.setPieceManager = function (pieceManager) {
    this.painterModel.setPieceManager(pieceManager);
  };

  PainterController.prototype.toString = function () {
    return 'PainterController';
  };

  return PainterController;
})();
