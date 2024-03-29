PAINTER.createNameSpace("PAINTER.model.piece.Ellipse");

PAINTER.model.piece.EllipsePiece = (function () {
  var AbstractPiece = PAINTER.model.piece.AbstractPiece;
  var EllipsePiece;

  EllipsePiece = function (x, y, width, height) {
    AbstractPiece.call(this);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  EllipsePiece.prototype = Object.create(AbstractPiece.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: EllipsePiece,
    },
  });

  EllipsePiece.prototype.draw = function (ctx) {
    this.applyStyle(ctx);

    EllipsePiece.drawEllipseByBezierCurve(ctx, this.x, this.y, this.width, this.height);
  };

  EllipsePiece.drawEllipseByBezierCurve = function (ctx, x, y, w, h) {
    var kappa = 0.5522848,
      ox = (w / 2) * kappa,
      oy = (h / 2) * kappa,
      xe = x + w,
      ye = y + h,
      xm = x + w / 2,
      ym = y + h / 2;

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    ctx.fill();

    ctx.stroke();
  };

  EllipsePiece.prototype.toString = function () {
    return "EllipsePiece";
  };

  return EllipsePiece;
})();
