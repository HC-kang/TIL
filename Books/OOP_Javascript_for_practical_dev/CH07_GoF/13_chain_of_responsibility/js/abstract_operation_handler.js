CALC.createNameSpace('CALC.chain.AbstractOperationHandler');

CALC.chain.AbstractOperationHandler = (function () {
  var AbstractOperationHandler;

  AbstractOperationHandler = function (operator) {
    this.operator = operator;
    this.next = null;
  };

  AbstractOperationHandler.prototype.setNext = function (next) {
    this.next = next;
    return next;
  };

  AbstractOperationHandler.prototype.handleRequest = function (request) {
    if (this.resolve(request)) {
      var result = this.operate(request);
      return result;
    } else if (this.next != null) {
      return this.next.handleRequest(request);
    } else {
      handleFail(request);
      return 0;
    }
  };

  AbstractOperationHandler.prototype.handleFail = function (request) {
    console.log('fail');
  };

  AbstractOperationHandler.prototype.getOperator = function () {
    return this.operator;
  };

  AbstractOperationHandler.prototype.resolve = function (request) {
    if (request.getExpression().indexOf(this.getOperator()) >= 0) {
      return true;
    }
    return false;
  };

  AbstractOperationHandler.toString = function () {
    return 'AbstractOperationHandler';
  };

  return AbstractOperationHandler;
})();
