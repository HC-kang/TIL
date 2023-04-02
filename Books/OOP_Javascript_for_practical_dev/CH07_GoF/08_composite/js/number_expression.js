CALC.createNameSpace('CALC.composite.NumberExpression');

CALC.composite.NumberExpression = (function () {
  var AbstractExpression = CALC.composite.AbstractExpression;

  var NumberExpression;

  NumberExpression = function (value) {
    AbstractExpression.call(this);

    this.value = value;
  };

  NumberExpression.prototype = Object.create(AbstractExpression.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
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
