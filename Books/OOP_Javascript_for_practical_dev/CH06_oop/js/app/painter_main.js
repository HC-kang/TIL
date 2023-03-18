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

    this.painterModel = new PAINTER.model.PainterModel();
    this.painterView = new PAINTER.view.PainterView();
    this.painterController = new PAINTER.controller.PainterController();

    this.toolButtonPanel = new PAINTER.view.panel.ToolButtonPanel();
    this.setup();

    this.toolButtonPanel.initLayout();
  };

  PainterMain.prototype.setup = function () {
    this.painterController.setPainterModel(this.painterModel);
    this.painterController.setPainterView(this.painterView);

    this.painterView.setPainterModel(this.painterModel);
    this.painterView.setPainterController(this.painterController);

    this.toolButtonPanel.setPainterController(this.painterController);

    this.painterModel.registerObserver(this.painterView);
  };

  PainterMain.prototype.toString = function () {
    return "PainterMain";
  };

  return PainterMain;
})();
