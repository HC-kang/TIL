CALC.createNameSpace('CALC.mediator.ClientMediator');

CALC.mediator.ClientMediator = (function () {
  var ClientMediator;

  ClientMediator = function () {
    var AddColleague = CALC.mediator.AddColleague;
    var SubtractColleague = CALC.mediator.SubtractColleague;
    var MultiplyColleague = CALC.mediator.MultiplyColleague;
    var DivideColleague = CALC.mediator.DivideColleague;

    this.addColleague = new AddColleague();
    this.subtractColleague = new SubtractColleague();
    this.multiplyColleague = new MultiplyColleague();
    this.divideColleague = new DivideColleague();

    this.createColleagues();
  };

  ClientMediator.prototype.createColleagues = function () {
    this.addColleague.setMediator(this);
    this.subtractColleague.setMediator(this);
    this.multiplyColleague.setMediator(this);
    this.divideColleague.setMediator(this);
  };

  ClientMediator.prototype.colleagueChanged = function (colleague) {
    var firstNumber = colleague.getFirstNumber();
    var secondNumber = colleague.getSecondNumber();

    this.addColleague.setFirstNumber(firstNumber);
    this.addColleague.setSecondNumber(secondNumber);

    this.addColleague.printResult();

    this.subtractColleague.setFirstNumber(firstNumber);
    this.subtractColleague.setSecondNumber(secondNumber);

    this.subtractColleague.printResult();

    this.multiplyColleague.setFirstNumber(firstNumber);
    this.multiplyColleague.setSecondNumber(secondNumber);

    this.multiplyColleague.printResult();

    this.divideColleague.setFirstNumber(firstNumber);
    this.divideColleague.setSecondNumber(secondNumber);

    this.divideColleague.printResult();
  };

  ClientMediator.prototype.getAddColleague = function () {
    return this.addColleague;
  };

  ClientMediator.prototype.getSubtractColleague = function () {
    return this.subtractColleague;
  };

  ClientMediator.prototype.getMultiplyColleague = function () {
    return this.multiplyColleague;
  };

  ClientMediator.prototype.getDivideColleague = function () {
    return this.divideColleague;
  };

  return ClientMediator;
})();
