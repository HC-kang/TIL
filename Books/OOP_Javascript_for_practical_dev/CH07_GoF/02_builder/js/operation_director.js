CALC.createNameSpace('CALC.builder.OperationDirector');

CALC.builder.OperationDirector = (function () {
  var OperationDirector;

  OperationDirector = function (builder) {
    this.builder = builder;
  };

  OperationDirector.prototype.construct = function () {
    this.builder.buildFirstNumber();
    this.builder.buildOperator();
    this.builder.buildSecondNumber();
    this.builder.buildAnswer();

    var result = this.builder.getResult();

    console.log(result);
  };

  return OperationDirector;
})();
