CALC.createNameSpace('CALC.mediator.AddColleague');

CALC.mediator.AddColleague = (function () {
  var IColleague = CALC.mediator.IColleague;

  var AddColleague;

  AddColleague = function () {
    IColleague.call(this);
  };

  AddColleague.prototype = Object.create(IColleague.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: AddColleague,
    },
  });

  AddColleague.prototype.getAnswer = function () {
    return this.getFirstNumber() + this.getSecondNumber();
  };

  AddColleague.prototype.getOperator = function () {
    return ' + ';
  };

  AddColleague.prototype.toString = function () {
    return 'AddColleague';
  };

  return AddColleague;
})();
