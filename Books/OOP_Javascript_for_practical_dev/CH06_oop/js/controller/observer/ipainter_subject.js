PAINTER.createNameSpace('PAINTER.controller.observer.IPainterSubject');

PAINTER.controller.observer.IPainterSubject = (function () {
  var IPainterSubject;

  IPainterSubject = function () {};

  IPainterSubject.prototype.notifyObservers = function () {
    throw new Error('You have to implement the method notifyObservers!');
  };

  IPainterSubject.prototype.registerObserver = function (observer) {
    throw new Error('You have to implement the method registerObserver!');
  };

  IPainterSubject.prototype.toString = function (observer) {
    throw new Error('You have to implement the method toString!');
  };

  IPainterSubject.prototype.toString = function () {
    return 'IPainterSubject';
  };

  return IPainterSubject;
})();
