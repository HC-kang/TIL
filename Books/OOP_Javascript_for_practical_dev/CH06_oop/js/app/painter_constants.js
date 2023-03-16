PAINTER.createNameSpace("PAINTER.app.PainterConstants");

PAINTER.app.PainterConstants = (function () {
  var PainterConstants;

  PainterConstants = function () {};

  PainterConstants.PAINTER_TITLE = "Painter";

  PainterConstants.PAINTER_WIDTH = 600;
  PainterConstants.PAINTER_HEIGHT = 400;

  PainterConstants.LINE = 1;
  PainterConstants.RECTANGLE = 2;
  PainterConstants.ELLIPSE = 3;
  PainterConstants.FREE_PATH = 4;

  PainterConstants.prototype.toString = function () {
    return "PainterConstants";
  };

  return PainterConstants;
})();
