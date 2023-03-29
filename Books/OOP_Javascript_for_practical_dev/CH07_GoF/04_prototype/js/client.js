CALC.createNameSpace('CALC.prototype.Client');

CALC.prototype.Client = (function () {
  var AddOperationPrototype = CALC.prototype.AddOperationPrototype;
  var SubtractOperationPrototype = CALC.prototype.SubtractOperationPrototype;
  var MultiplyOperationPrototype = CALC.prototype.MultiplyOperationPrototype;
  var DivideOperationPrototype = CALC.prototype.DivideOperationPrototype;

  var Client;

  Client = function () {
    this.operationPrototype = null;
    this.operationPrototypeMap = {};

    this.initOperationMap();
  };

  Client.prototype.operate = function () {
    this.operationPrototype.operate();
  };

  Client.prototype.setOperation = function (
    operator,
    firstNumber,
    secondNumber
  ) {
    this.operationPrototype = this.getOperationClone(operator);

    this.operationPrototype.setFirstNumber(firstNumber);
    this.operationPrototype.setSecondNumber(secondNumber);
  };

  Client.prototype.initOperationMap = function () {
    this.operationPrototypeMap['+'] = new AddOperationPrototype();
    this.operationPrototypeMap['-'] = new SubtractOperationPrototype();
    this.operationPrototypeMap['*'] = new MultiplyOperationPrototype();
    this.operationPrototypeMap['/'] = new DivideOperationPrototype();
  };

  Client.prototype.getOperationClone = function (operator) {
    var operation = this.operationPrototypeMap[operator];
    return operation.getClone();
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
