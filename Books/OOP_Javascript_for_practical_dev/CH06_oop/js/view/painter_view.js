PAINTER.createNameSpace('PAINTER.view.PainterView');

PAINTER.view.PainterView = (function () {
  var IPainterObserver = PAINTER.controller.observer.IPainterObserver;
  var PainterView;

  PainterView = function () {
    var PainterConstants = PAINTER.app.PainterConstants;

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

    this.painterModel = null;

    this.painterController = null;

    this.canvasImageData = null;

    canvas.addEventListener(
      'mousedown',
      this.handleMouseEvent.bind(this),
      false
    );
  };

  PainterView.prototype = Object.create(IPainterObserver.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: PainterView,
    }
  });

  PainterView.prototype.handleMouseEvent = function (e) {
    console.log('mousedownEventListener');
    var canvas = this.canvas;
    var painterViewThis = this;

    var painterController = this.painterController;

    // NOTE: ???
    // var canvasImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.saveImageData();

    var pressPoint = this.relativePosition(e, canvas);

    painterController.controlPress(pressPoint.x, pressPoint.y);

    var mouseMoveEventListener = function (e) {
      console.log('mousemoveEventListener');
      var movePoint = painterViewThis.relativePosition(
        e,
        canvas
      );

      painterController.controlDrag(movePoint.x, movePoint.y);
    };

    document.addEventListener('mousemove', mouseMoveEventListener, false);

    var mouseUpEventListener = function (e) {
      console.log('mouseupEventListener');
      var upPoint = painterViewThis.relativePosition(e, canvas);

      painterController.controlRelease(upPoint.x, upPoint.y);

      document.removeEventListener('mousemove', mouseMoveEventListener, false);
      document.removeEventListener('mouseup', arguments.callee, false);
    };

    document.addEventListener('mouseup', mouseUpEventListener, false);
  };

  PainterView.prototype.repaint = function () {
    this.ctx.putImageData(this.canvasImageData, 0, 0);

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

  PainterView.prototype.drawing = function () {
    this.ctx.putImageData(this.canvasImageData, 0, 0);

    if (this.painterController !== null) {
      if (this.painterController.isValidDrawing()) {
        this.painterController.drawing(this.ctx);
      }
    }
  };

  PainterView.prototype.saveImageData = function () {
    this.canvasImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  };

  PainterView.prototype.setPainterModel = function (painterModel) {
    this.painterModel = painterModel;
  };

  PainterView.prototype.setPainterController = function (painterController) {
    this.painterController = painterController;
  };

  PainterView.prototype.update = function () {
    this.repaint();
  }

  PainterView.prototype.toString = function () {
    return 'PainterView';
  };

  return PainterView;
})();
