CALC.createNameSpace('CALC.mediator.SubtractColleague');

CALC.mediator.SubtractColleague = (function () {
  var IColleague = CALC.mediator.IColleague;

  var SubtractColleague;

  SubtractColleague = function () {
    IColleague.call(this);
  };

  SubtractColleague.prototype = Object.create(IColleague.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: SubtractColleague,
    },
  });

  SubtractColleague.prototype.getAnswer = function () {
    return this.getFirstNumber() - this.getSecondNumber();
  };

  SubtractColleague.prototype.getOperator = function () {
    return ' - ';
  };

  SubtractColleague.prototype.toString = function () {
    return 'SubtractColleague';
  };

  return SubtractColleague;
})();
