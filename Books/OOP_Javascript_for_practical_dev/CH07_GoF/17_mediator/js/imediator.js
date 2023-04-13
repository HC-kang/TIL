CALC.createNameSpace('CALC.mediator.IMediator');

CALC.mediator.IMediator = (function () {
  var IMediator;

  IMediator = function () {};

  IMediator.prototype.createColleagues = function () {
    throw new Error('You have to implement the method createColleagues');
  };

  IMediator.prototype.colleagueChanged = function (colleague) {
    throw new Error('You have to implement the method colleagueChanged');
  };

  IMediator.prototype.toString = function () {
    return 'IMediator';
  };

  return IMediator;
})();
