PAINTER.createNameSpace("PAINTER.app.PainterMain");

PAINTER.app.PainterMain = (function () {
  var PainterMain;

  PainterMain = function (painterDivId) {
    var painter = document.getElementById(painterDivId);

    var toolbar = document.createElement("div");
    toolbar.setAttribute("id", "toolbar");

    var mycanvas = document.createElement("canvas");
    mycanvas.setAttribute("id", "mycanvas");

    painter.appendChild(toolbar);
    painter.appendChild(mycanvas);

    var painterView = new PAINTER.view.PainterView();

    var toolButtonPanel = new PAINTER.view.panel.ToolButtonPanel(painterView);
    toolButtonPanel.initLayout();
  };

  PainterMain.prototype.toString = function () {
    return "PainterMain";
  };

  return PainterMain;
})();
