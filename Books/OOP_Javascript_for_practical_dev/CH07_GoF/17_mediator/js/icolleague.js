CALC.createNameSpace('CALC.mediator.IColleague');

CALC.mediator.IColleague = (function () {
  var IColleague;

  IColleague = function () {
    this.mediator = null;

    this.firstNumber = 100;
    this.secondNumber = 10;
  };

  IColleague.prototype.getAnswer = function () {
    throw new Error('You have to implement the method getAnswer');
  };

  IColleague.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator');
  };

  IColleague.prototype.printResult = function () {
    var answer = this.getAnswer();
    console.log(
      this.firstNumber + this.getOperator() + this.secondNumber + ' = ' + answer
    );
  };

  IColleague.prototype.changeFirstNumber = function (firstNumber) {
    this.setFirstNumber(firstNumber);

    this.mediator.colleagueChanged(this);
  };

  IColleague.prototype.changeSecondNumber = function (secondNumber) {
    this.setSecondNumber(secondNumber);

    this.mediator.colleagueChanged(this);
  };

  IColleague.prototype.getFirstNumber = function () {
    return this.firstNumber;
  };

  IColleague.prototype.getSecondNumber = function () {
    return this.secondNumber;
  };

  IColleague.prototype.setFirstNumber = function (firstNumber) {
    this.firstNumber = firstNumber;
  };

  IColleague.prototype.setSecondNumber = function (secondNumber) {
    this.secondNumber = secondNumber;
  };

  IColleague.prototype.setMediator = function (mediator) {
    this.mediator = mediator;
  };

  IColleague.prototype.toString = function () {
    return 'IColleague';
  };

  return IColleague;
})();
