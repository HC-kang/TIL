PAINTER.createNameSpace('PAINTER.view.PainterView');

PAINTER.view.PainterView = (function () {
  var PainterView;

  PainterView = function () {
    var PainterConstants = PAINTER.app.PainterConstants;

    var PainterModel = PAINTER.model.PainterModel;

    var canvas = document.getElementById('mycanvas');
    canvas.width = PainterConstants.PAINTER_WIDTH;
    canvas.height = PainterConstants.PAINTER_HEIGHT;

    canvas.style.border = '1px solid gray';
    canvas.style.cursor = 'pointer';

    this.canvas = canvas;

    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";

    this.ctx = ctx;

    this.painterModel = new PainterModel();

    this.pieceType = PainterConstants.LINE;

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;

    canvas.addEventListener(
      'mousedown',
      this.handleMouseEvent.bind(this),
      false
    );
  };

  PainterView.prototype.handleMouseEvent = function (e) {
    console.log('mousedownEventListner');
    var canvas = this.canvas;
    var painterViewThis = this;

    var canvasImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    var pressPoint = this.relativePosition(e, canvas);

    painterViewThis.startX = pressPoint.x;
    painterViewThis.startY = pressPoint.y;

    var mousemoveEventListner = function (e) {
      var movePoint = painterViewThis.relativePosition(
        e,
        painterViewThis.canvas
      );

      painterViewThis.endX = movePoint.x;
      painterViewThis.endY = movePoint.y;

      painterViewThis.ctx.putImageData(canvasImageData, 0, 0);

      painterViewThis.drawing(painterViewThis.ctx);
      console.log('mousemoveEventListner');
    };

    document.addEventListener('mousemove', mousemoveEventListner, false);

    document.addEventListener(
      'mouseup',
      function (e) {
        var upPoint = painterViewThis.relativePosition(e, canvas);

        painterViewThis.endX = upPoint.x;
        painterViewThis.endY = upPoint.y;

        painterViewThis.ctx.putImageData(canvasImageData, 0, 0);

        painterViewThis.drawing(painterViewThis.ctx);

        console.log('mouseupEventListner');

        document.removeEventListener('mousemove', mousemoveEventListner, false);

        document.removeEventListener('mouseup', arguments.callee, false);
      },
      false
    );
  };

  PainterView.prototype.repaint = function () {
    this.painterModel.drawPieces(this.ctx);
  };

  PainterView.prototype.relativePosition = function (event, element) {
    var rect = element.getBoundingClientRect();
    return { x: Math.floor(event.clientX - rect.left),
             y: Math.floor(event.clientY - rect.top) };
  };

  PainterView.prototype.setPieceType = function (pieceType) {
    this.pieceType = pieceType;
  }

  PainterView.prototype.drawing = function (ctx) {
    var PainterConstants = PAINTER.app.PainterConstants;

    if (this.pieceType === PainterConstants.LINE) {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    } else if (this.pieceType === PainterConstants.RECTANGLE) {
      var w = this.endX - this.startX;
      var h = this.endY - this.startY;

      ctx.fillRect(this.startX, this.startY, w, h);

      ctx.strokeRect(this.startX, this.startY, w, h);
    } else if (this.pieceType === PainterConstants.ELLIPSE) {
      var w = this.endX - this.startX;
      var h = this.endY - this.startY;

      this.drawEllipseByBezierCurve(ctx, this.startX, this.startY, w, h);
    }
  }

  PainterView.prototype.drawEllipseByBezierCurve = function (ctx, x, y, w, h) {
    var kappa = 0.5522848;
        ox = (w / 2) * kappa,
        oy = (h / 2) * kappa,
        xe = x + w,
        ye = y + h,
        xm = x + w / 2,
        ym = y + h / 2;

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

        ctx.fill();

        ctx.stroke();
  };

  PainterView.prototype.toString = function () {
    return 'PainterView';
  };

  return PainterView;
})();
