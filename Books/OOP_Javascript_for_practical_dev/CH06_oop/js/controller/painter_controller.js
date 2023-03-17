PAINTER.createNameSpace('PAINTER.controller.PainterController');

PAINTER.controller.PainterController = (function () {
  var PainterController;

  PainterController = function () {
    this.painterModel = null;
    this.painterView = null;

    this.startX;
    this.startY;

    this.endX;
    this.endY;

    this.points = [];
  };

  PainterController.prototype.controlPress = function (mouseX, mouseY) {
    var PainterConstants = PAINTER.app.PainterConstants;
    var Point = PAINTER.model.struct.Point;

    var pieceType = this.painterModel.getPieceType();

    this.startX = mouseX;
    this.startY = mouseY;

    if (pieceType === PainterConstants.FREE_PATH) {
      this.points.push(new Point(mouseX, mouseY));
    }
  };

  PainterController.prototype.controlRelease = function (mouseX, mouseY) {
    var PainterConstants = PAINTER.app.PainterConstants;
    var LinePiece = PAINTER.model.piece.LinePiece;
    var RectanglePiece = PAINTER.model.piece.RectanglePiece;
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;
    var FreePathPiece = PAINTER.model.piece.FreePathPiece;

    var pieceType = this.painterModel.getPieceType();

    this.endX = mouseX;
    this.endY = mouseY;

    if (pieceType === PainterConstants.LINE) {
      this.painterModel.addPiece(
        new LinePiece(this.startX, this.startY, this.endX, this.endY)
      );
    } else if (pieceType === PainterConstants.RECTANGLE) {
      var x = Math.min(this.startX, this.endX);
      var y = Math.min(this.startY, this.endY);
      var width = Math.abs(this.startX - this.endX);
      var height = Math.abs(this.startY - this.endY);

      this.painterModel.addPiece(new RectanglePiece(x, y, width, height));
    } else if (pieceType === PainterConstants.ELLIPSE) {
      var x = Math.min(this.startX, this.endX);
      var y = Math.min(this.startY, this.endY);
      var width = Math.abs(this.startX - this.endX);
      var height = Math.abs(this.startY - this.endY);

      this.painterModel.addPiece(new EllipsePiece(x, y, width, height));
    } else if (pieceType === PainterConstants.FREE_PATH) {
      this.painterModel.addPiece(new FreePathPiece(this.points));
    }

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;

    if (pieceType === PainterConstants.FREE_PATH) {
      this.points = [];
    }

    this.painterView.repaint();
  };

  PainterController.prototype.controlDrag = function (mouseX, mouseY) {
    var PainterConstants = PAINTER.app.PainterConstants;
    var Point = PAINTER.model.struct.Point;

    var pieceType = this.painterModel.getPieceType();

    this.endX = mouseX;
    this.endY = mouseY;

    if (pieceType === PainterConstants.FREE_PATH) {
      this.points.push(new Point(this.endX, this.endY));
    }

    this.painterView.drawing();
  };

  PainterController.prototype.isValidDrawing = function () {
    return this.startX != this.endX || this.startY != this.endY;
  };

  PainterController.prototype.drawing = function (ctx) {
    var PainterConstants = PAINTER.app.PainterConstants;
    var EllipsePiece = PAINTER.model.piece.EllipsePiece;

    var pieceType = this.painterModel.getPieceType();

    if (pieceType === PainterConstants.LINE) {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    } else if (pieceType === PainterConstants.RECTANGLE) {
      var w = this.endX - this.startX;
      var h = this.endY - this.startY;

      ctx.fillRect(this.startX, this.startY, w, h);

      ctx.strokeRect(this.startX, this.startY, w, h);
    } else if (pieceType === PainterConstants.ELLIPSE) {
      var w = this.endX - this.startX;
      var h = this.endY - this.startY;

      EllipsePiece.drawEllipseByBezierCurve(ctx, this.startX, this.startY, w, h);
    } else if (pieceType === PainterConstants.FREE_PATH) {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);

      for (var i = 0; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      ctx.stroke();
    }
  };

  PainterController.prototype.setPieceType = function (pieceType) {
    this.painterModel.setPieceType(pieceType);
  };

  PainterController.prototype.setPainterView = function (painterView) {
    this.painterView = painterView;
  };

  PainterController.prototype.setPainterModel = function (painterModel) {
    this.painterModel = painterModel;
  };

  PainterController.prototype.toString = function () {
    return 'PainterController';
  };

  return PainterController;
})();
