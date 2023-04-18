CALC.createNameSpace('CALC.strategy.OperationContext');

CALC.strategy.OperationContext = (function () {
  var OperationContext;

  OperationContext = function () {
    this.operationStrategy = null;
  };

  OperationContext.prototype.operate = function (firstNumber, secondNumber) {
    var answer = this.operationStrategy.getAnswer(firstNumber, secondNumber);

    var operator = this.operationStrategy.getOperator();

    var result = firstNumber + operator + secondNumber + ' = ' + answer;

    this.print(result);
  };

  OperationContext.prototype.setOperationStrategy = function (
    operationStrategy
  ) {
    this.operationStrategy = operationStrategy;
  };

  OperationContext.prototype.print = function (result) {
    console.log(result);
  };

  OperationContext.prototype.toString = function () {
    return 'OperationContext';
  };

  return OperationContext;
})();
