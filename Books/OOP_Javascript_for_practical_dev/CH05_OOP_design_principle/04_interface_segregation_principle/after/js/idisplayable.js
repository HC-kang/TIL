CALC.createNameSpace('CALC.isp.after.IDisplayable');

CALC.isp.after.IDisplayable = (function () {
  var IDisplayable;

  IDisplayable = function () {};

  IDisplayable.prototype.display = function (
    operation,
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method display!');
  };

  IDisplayable.prototype.toString = function () {
    return 'IDisplayable';
  };

  return IDisplayable;
})();
