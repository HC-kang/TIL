CALC.createNameSpace('CALC.facade.CalculatorFacade');

CALC.facade.CalculatorFacade = (function () {
  var ExpressionParser = CALC.facade.ExpressionParser;
  var NumberOperand = CALC.facade.NumberOperand;
  var OperationFactory = CALC.factory.OperationFactory;

  var CalculatorFacade;

  CalculatorFacade = function () {
    this.expression = null;
  };

  CalculatorFacade.prototype.calculate = function (expression) {
    var expressionParser = new ExpressionParser();
    expressionParser.parse(expression);

    var operatorToken = expressionParser.getOperatorToken();

    var firstNumberToken = expressionParser.getFirstNumberToken();
    var secondNumberToken = expressionParser.getSecondNumberToken();

    var firstNumberOperand = new NumberOperand(firstNumberToken);
    var secondNumberOperand = new NumberOperand(secondNumberToken);

    var firstNumber = firstNumberOperand.getNumber();
    var secondNumber = secondNumberOperand.getNumber();

    var operationFactory = new OperationFactory();
    var operationProduct =
      operationFactory.createOperationProduct(operatorToken);

    operationProduct.operate(firstNumber, secondNumber);
  };

  CalculatorFacade.prototype.toString = function () {
    return 'CalculatorFacade';
  };

  return CalculatorFacade;
})();
