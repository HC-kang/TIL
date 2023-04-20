CALC.createNameSpace('CALC.visitor.SetValueToVariableVisitor');

CALC.visitor.SetValueToVariableVisitor = (function () {
  var AbstractVisitor = CALC.visitor.AbstractVisitor;

  var SetValueToVariableVisitor;

  SetValueToVariableVisitor = function (variableName, value) {
    AbstractVisitor.call(this);

    this.variableName = variableName;
    this.value = value;
  };

  SetValueToVariableVisitor.prototype = Object.create(
    AbstractVisitor.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SetValueToVariableVisitor,
      },
    }
  );

  SetValueToVariableVisitor.prototype.visit = function (expression) {
    if (expression.getName() === this.variableName) {
      expression.setValue(this.value);
    }
  };

  SetValueToVariableVisitor.prototype.toString = function () {
    return 'SetValueToVariableVisitor';
  };

  return SetValueToVariableVisitor;
})();
