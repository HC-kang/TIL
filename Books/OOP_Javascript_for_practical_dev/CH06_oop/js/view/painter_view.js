PAINTER.createNameSpace("PAINTER.view.PainterView");

PAINTER.view.PainterView = (function () {
  var PainterView;

  PainterView = function () {
    var PainterConstants = PAINTER.app.PainterConstants;

    var PainterModel = PAINTER.model.PainterModel;

    var LinePiece = PAINTER.model.piece.LinePiece;
    var RectanglePiece = PAINTER.model.piece.RectanglePiece;
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;
    var FreePathPiece = PAINTER.model.piece.FreePathPiece;

    var canvas = document.getElementById("mycanvas");
    canvas.width = PainterConstants.PAINTER_WIDTH;
    canvas.height = PainterConstants.PAINTER_HEIGHT;

    canvas.style.border = "1px solid gray";
    canvas.style.cursor = "pointer";

    var ctx = canvas.getContext("2d");

    this.ctx = ctx;

    this.painterModel = new PainterModel();

    var linePiece = new LinePiece(50, 50, 100, 80);
    linePiece.setStrokeColor("pink");

    this.painterModel.addPiece(linePiece);

    var rectanglePiece = new RectanglePiece(110, 20, 100, 50);
    rectanglePiece.setStrokeColor("red");
    rectanglePiece.setFillColor("blue");

    this.painterModel.addPiece(rectanglePiece);

    var ellipsePiece = new EllipsePiece(110, 120, 100, 80);
    ellipsePiece.setStrokeColor("green");
    ellipsePiece.setFillColor("yellow");

    this.painterModel.addPiece(ellipsePiece);

    var points = [];

    points.push({ x: 10, y: 20 });
    points.push({ x: 30, y: 140 });
    points.push({ x: 50, y: 60 });

    var freePathPiece = new FreePathPiece(points);
    freePathPiece.setStrokeColor("black");

    this.painterModel.addPiece(freePathPiece);
  };

  PainterView.prototype.repaint = function () {
    this.painterModel.drawPieces(this.ctx);
  };

  PainterView.prototype.toString = function () {
    return "PainterView";
  };

  return PainterView;
})();
