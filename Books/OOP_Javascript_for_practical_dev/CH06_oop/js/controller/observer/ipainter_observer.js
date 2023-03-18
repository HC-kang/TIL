PAINTER.createNameSpace('PAINTER.controller.observer.IPainterObserver');

PAINTER.controller.observer.IPainterObserver = (function () {
  var IPainterObserver;

  IPainterObserver = function () {};

  IPainterObserver.prototype.update = function () {
    throw new Error('You have to implement the method update!');
  };

  IPainterObserver.prototype.toString = function () {
    return 'IPainterObserver';
  };

  return IPainterObserver;
})();
