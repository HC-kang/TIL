PAINTER.createNameSpace("PAINTER.view.PainterView");

PAINTER.view.PainterView = (function () {
  var PainterView;

  PainterView = function () {
    var PainterConstants = PAINTER.app.PainterConstants;

    var canvas = document.getElementById("mycanvas");
    canvas.width = PainterConstants.PAINTER_WIDTH;
    canvas.height = PainterConstants.PAINTER_HEIGHT;

    canvas.style.border = "1px solid gray";
    canvas.style.cursor = "pointer";

    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";

    this.ctx = ctx;
  };

  PainterView.prototype.repaint = function () {
    var x = 10;
    var y = 20;
    var w = 100;
    var h = 50;

    this.ctx.fillRect(x, y, w, h);

    this.ctx.strokeRect(x, y, w, h);
  };

  PainterView.prototype.toString = function () {
    return "PainterView";
  };

  return PainterView;
})();
