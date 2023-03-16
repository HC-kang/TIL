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

    var btnLine = document.getElementById("btnLine");
    var btnRectangle = document.getElementById("btnRectangle");
    var btnEllipse = document.getElementById("btnEllipse");
    var btnFreePath = document.getElementById("btnFreePath");

    var painterViewThis = this.painterView;

    btnLine.addEventListener("click", function (e) {
      console.log('btnLine clicked');
      painterViewThis.setPieceType(1);
    }, false);
    btnRectangle.addEventListener("click", function (e) {
      console.log('btnRectangle clicked')
      painterViewThis.setPieceType(2);
    }, false);
    btnEllipse.addEventListener("click", function (e) {
      console.log('btnEllipse clicked');
      painterViewThis.setPieceType(3);
    }, false);
    btnFreePath.addEventListener("click", function (e) {
      console.log('btnFreePath clicked');
      painterViewThis.setPieceType(4);
    }, false);
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
