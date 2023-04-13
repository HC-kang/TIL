CALC.createNameSpace('CALC.mediator.DivideColleague');

CALC.mediator.DivideColleague = (function () {
  var IColleague = CALC.mediator.IColleague;

  var DivideColleague;

  DivideColleague = function () {
    IColleague.call(this);
  };

  DivideColleague.prototype = Object.create(IColleague.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: DivideColleague,
    },
  });

  DivideColleague.prototype.getAnswer = function () {
    return this.getFirstNumber() / this.getSecondNumber();
  };

  DivideColleague.prototype.getOperator = function () {
    return ' / ';
  };

  DivideColleague.prototype.toString = function () {
    return 'DivideColleague';
  };

  return DivideColleague;
})();
