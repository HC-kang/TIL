PAINTER.createNameSpace("PAINTER.app.PainterMain");

PAINTER.app.PainterMain = (function () {
  var PainterMain;

  PainterMain = function () {
    var painterView = new PAINTER.view.PainterView();
    painterView.repaint();

    var toolButtonPanel = new PAINTER.view.panel.ToolButtonPanel();
    toolButtonPanel.initLayout();
  };

  PainterMain.prototype.toString = function () {
    return "PainterMain";
  };

  return PainterMain;
})();
