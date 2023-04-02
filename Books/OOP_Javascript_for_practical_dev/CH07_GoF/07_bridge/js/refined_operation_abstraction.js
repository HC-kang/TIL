CALC.createNameSpace('CALC.bridge.RefinedOperationAbstraction');

CALC.bridge.RefinedOperationAbstraction = (function () {
  var OperationAbstraction = CALC.bridge.OperationAbstraction;

  var RefinedOperationAbstraction;

  RefinedOperationAbstraction = function (impl) {
    OperationAbstraction.call(this, impl);
  };

  RefinedOperationAbstraction.prototype = Object.create(
    OperationAbstraction.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: RefinedOperationAbstraction,
      },
    }
  );

  RefinedOperationAbstraction.prototype.sqrt = function (a) {
    return Math.sqrt(a);
  };

  RefinedOperationAbstraction.prototype.pow = function (a, b) {
    return Math.pow(a, b);
  };

  RefinedOperationAbstraction.prototype.toString = function () {
    return 'RefinedOperationAbstraction';
  };

  return RefinedOperationAbstraction;
})();
