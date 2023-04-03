CALC.createNameSpace('CALC.decorator.NumberExpression');

CALC.decorator.NumberExpression = (function () {
  var AbstractExpression = CALC.decorator.AbstractExpression;

  var NumberExpression;

  NumberExpression = function (value) {
    AbstractExpression.call(this);

    this.value = value;
  };

  NumberExpression.prototype = Object.create(AbstractExpression.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: NumberExpression,
    },
  });

  NumberExpression.prototype.operate = function () {
    return this.value;
  };

  NumberExpression.prototype.toString = function () {
    return 'NumberExpression';
  };

  return NumberExpression;
})();
