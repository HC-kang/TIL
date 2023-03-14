PAINTER.createNameSpace("PAINTER.view.panel.ToolButtonPanel");

PAINTER.view.panel.ToolButtonPanel = (function () {
  var ToolButtonPanel;

  ToolButtonPanel = function (painterView) {
    this.painterView = painterView;
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
  };

  ToolButtonPanel.prototype.createButton = function (imagePath, id) {
    var inputImage = document.createElement("input");
    inputImage.setAttribute("type", "image");
    inputImage.setAttribute("src", imagePath);
    inputImage.setAttribute("id", id);

    return inputImage;
  };

  ToolButtonPanel.prototype.toString = function () {
    return "ToolButtonPanel";
  };

  return ToolButtonPanel;
})();
