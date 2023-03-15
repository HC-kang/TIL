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

    this.ctx = ctx;

    this.painterModel = new PainterModel();

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

    var pressPoint = this.relativePosition(e, canvas);

    var mousemoveEventListner = function (e) {
      var movePoint = painterViewThis.relativePosition(
        e,
        painterViewThis.canvas
      );
      console.log('mousemoveEventListner');
    };

    document.addEventListener('mousemove', mousemoveEventListner, false);

    document.addEventListener(
      'mouseup',
      function (e) {
        var upPoint = painterViewThis.relativePosition(e, canvas);

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

  PainterView.prototype.toString = function () {
    return 'PainterView';
  };

  return PainterView;
})();
