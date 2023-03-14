PAINTER.createNameSpace("PAINTER.view.PainterView");

PAINTER.view.PainterView = (function () {
  var PainterView;

  PainterView = function () {
    var PainterConstants = PAINTER.app.PainterConstants;

    var PainterModel = PAINTER.model.PainterModel;

    var LinePiece = PAINTER.model.piece.LinePiece;
    var RectanglePiece = PAINTER.model.piece.RectanglePiece;
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;

    var canvas = document.getElementById("mycanvas");
    canvas.width = PainterConstants.PAINTER_WIDTH;
    canvas.height = PainterConstants.PAINTER_HEIGHT;

    canvas.style.border = "1px solid gray";
    canvas.style.cursor = "pointer";

    var ctx = canvas.getContext("2d");

    this.ctx = ctx;

    this.painterModel = new PainterModel();

    this.painterModel.addPiece(new LinePiece(50, 50, 100, 80));
    this.painterModel.addPiece(new RectanglePiece(110, 20, 100, 50));
    this.painterModel.addPiece(new EllipsePiece(110, 120, 100, 80));
  };

  PainterView.prototype.repaint = function () {
    this.painterModel.drawPieces(this.ctx);
  };

  PainterView.prototype.toString = function () {
    return "PainterView";
  };

  return PainterView;
})();
