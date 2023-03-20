PAINTER.createNameSpace('PAINTER.view.panel.ToolButtonPanel');

PAINTER.view.panel.ToolButtonPanel = (function () {
  var ToolButtonPanel;

  ToolButtonPanel = function () {
    this.painterController = null;
  };

  ToolButtonPanel.prototype.initLayout = function () {
    var toolbar = document.getElementById('toolbar');

    var inputImage = this.createButton('./images/line.gif', 'btnLine');
    toolbar.appendChild(inputImage);

    inputImage = this.createButton('./images/rectangle.gif', 'btnRectangle');
    toolbar.appendChild(inputImage);

    inputImage = this.createButton('./images/ellipse.gif', 'btnEllipse');
    toolbar.appendChild(inputImage);

    inputImage = this.createButton('./images/free_path.gif', 'btnFreePath');
    toolbar.appendChild(inputImage);

    var btnLine = document.getElementById('btnLine');
    var btnRectangle = document.getElementById('btnRectangle');
    var btnEllipse = document.getElementById('btnEllipse');
    var btnFreePath = document.getElementById('btnFreePath');

    var painterController = this.painterController;

    var LineState = PAINTER.controller.state.LineState;
    var RectangleState = PAINTER.controller.state.RectangleState;
    var EllipseState = PAINTER.controller.state.EllipseState;
    var FreePathState = PAINTER.controller.state.FreePathState;

    btnLine.addEventListener(
      'click',
      function (e) {
        painterController.setState(LineState.getInstance());
      },
      false
    );
    btnRectangle.addEventListener(
      'click',
      function (e) {
        painterController.setState(RectangleState.getInstance());
      },
      false
    );
    btnEllipse.addEventListener(
      'click',
      function (e) {
        painterController.setState(EllipseState.getInstance());
      },
      false
    );
    btnFreePath.addEventListener(
      'click',
      function (e) {
        painterController.setState(FreePathState.getInstance());
      },
      false
    );
    var size = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28];
    var select = document.createElement('select');
    for (var i = 0; i < size.length; i++) {
      var option = document.createElement('option');
      option.setAttribute('value', size[i].toString());
      var optionText = document.createTextNode(size[i].toString());
      option.appendChild(optionText);

      select.appendChild(option);
    }
    select.selectedIndex = 7;

    var labelStrokeWidth = document.createElement('label');
    var labelStrokeWidthText = document.createTextNode('Stroke Width: ');

    labelStrokeWidth.appendChild(labelStrokeWidthText);
    labelStrokeWidth.appendChild(select);

    toolbar.appendChild(labelStrokeWidth);

    select.addEventListener(
      'change',
      function (e) {
        painterController.setStrokeWidth(this.value);
      },
      false
    );

    var strokeColorChangeEventListener = function (e) {
      painterController.setStrokeColor(this.value);
    };

    var labelForStrokeColor = this.createLabelForColor(
      ' Stroke Color: ',
      '#FF0000',
      strokeColorChangeEventListener
    );

    toolbar.appendChild(labelForStrokeColor);

    var fillColorChangeEventListener = function (e) {
      painterController.setFillColor(this.value);
    };

    var labelForFillColor = this.createLabelForColor(' Fill Color: ', '#0000FF', fillColorChangeEventListener);

    toolbar.appendChild(labelForFillColor);
  };

  ToolButtonPanel.prototype.createButton = function (imagePath, id) {
    var inputImage = document.createElement('input');
    inputImage.setAttribute('type', 'image');
    inputImage.setAttribute('src', imagePath);
    inputImage.setAttribute('id', id);

    return inputImage;
  };

  ToolButtonPanel.prototype.createLabelForColor = function (
    text,
    defaultValue,
    changeEventListener
  ) {
    var labelForColor = document.createElement('label');
    var labelText = document.createTextNode(text);

    var inputColor = document.createElement('input');
    inputColor.setAttribute('type', 'color');

    inputColor.value = defaultValue;

    inputColor.addEventListener('change', changeEventListener, false);

    labelForColor.appendChild(labelText);
    labelForColor.appendChild(inputColor);

    return labelForColor;
  };

  ToolButtonPanel.prototype.setPainterController = function (
    painterController
  ) {
    this.painterController = painterController;
  };

  ToolButtonPanel.prototype.toString = function () {
    return 'ToolButtonPanel';
  };

  return ToolButtonPanel;
})();
