CALC.createNameSpace('CALC.facade.NumberOperand');

CALC.facade.NumberOperand = (function () {
  var NumberOperand;

  NumberOperand = function (value) {
    this.value = value;
  };

  NumberOperand.prototype.getNumber = function () {
    return parseInt(this.value, 10);
  };

  NumberOperand.prototype.toString = function () {
    return 'NumberOperand';
  };

  return NumberOperand;
})();
