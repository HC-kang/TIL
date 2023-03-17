PAINTER.createNameSpace("PAINTER.view.panel.ToolButtonPanel");

PAINTER.view.panel.ToolButtonPanel = (function () {
  var ToolButtonPanel;

  ToolButtonPanel = function () {
    this.painterController = null;
  };

  ToolButtonPanel.prototype.initLayout = function () {
    var toolbar = document.getElementById("toolbar");

    var inputImage = this.createButton("./images/line.gif", "btnLine");
    toolbar.appendChild(inputImage);

    inputImage = this.createButton("./images/rectangle.gif", "btnRectangle");
    toolbar.appendChild(inputImage);

    inputImage = this.createButton("./images/ellipse.gif", "btnEllipse");
    toolbar.appendChild(inputImage);

    inputImage = this.createButton("./images/free_path.gif", "btnFreePath");
    toolbar.appendChild(inputImage);

    var btnLine = document.getElementById("btnLine");
    var btnRectangle = document.getElementById("btnRectangle");
    var btnEllipse = document.getElementById("btnEllipse");
    var btnFreePath = document.getElementById("btnFreePath");

    var painterController = this.painterController;

    btnLine.addEventListener("click", function (e) {
      painterController.setPieceType(1);
    }, false);
    btnRectangle.addEventListener("click", function (e) {
      painterController.setPieceType(2);
    }, false);
    btnEllipse.addEventListener("click", function (e) {
      painterController.setPieceType(3);
    }, false);
    btnFreePath.addEventListener("click", function (e) {
      painterController.setPieceType(4);
    }, false);
  };

  ToolButtonPanel.prototype.createButton = function (imagePath, id) {
    var inputImage = document.createElement("input");
    inputImage.setAttribute("type", "image");
    inputImage.setAttribute("src", imagePath);
    inputImage.setAttribute("id", id);

    return inputImage;
  };

  ToolButtonPanel.prototype.setPainterController = function (painterController) {
    this.painterController = painterController;
  }

  ToolButtonPanel.prototype.toString = function () {
    return "ToolButtonPanel";
  };

  return ToolButtonPanel;
})();
