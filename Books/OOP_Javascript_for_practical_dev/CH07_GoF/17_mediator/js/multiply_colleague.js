CALC.createNameSpace('CALC.mediator.MultiplyColleague');

CALC.mediator.MultiplyColleague = (function () {
  var IColleague = CALC.mediator.IColleague;

  var MultiplyColleague;

  MultiplyColleague = function () {
    IColleague.call(this);
  };

  MultiplyColleague.prototype = Object.create(IColleague.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: MultiplyColleague,
    },
  });

  MultiplyColleague.prototype.getAnswer = function () {
    return this.getFirstNumber() * this.getSecondNumber();
  };

  MultiplyColleague.prototype.getOperator = function () {
    return ' * ';
  };

  MultiplyColleague.prototype.toString = function () {
    return 'MultiplyColleague';
  };

  return MultiplyColleague;
})();
