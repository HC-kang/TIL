CALC.createNameSpace('CALC.flyweight.TextStyleFlyweightFactory');

CALC.flyweight.TextStyleFlyweightFactory = (function () {
  var TextStyleFlyweightFactory;

  TextStyleFlyweightFactory = function () {
    if (TextStyleFlyweightFactory._instance) {
      return TextStyleFlyweightFactory._instance;
    }

    TextStyleFlyweightFactory._instance = this;

    this.pool = {};
  };

  TextStyleFlyweightFactory.getInstance = function () {
    if (!TextStyleFlyweightFactory._instance) {
      TextStyleFlyweightFactory._instance = new TextStyleFlyweightFactory();
    }

    return TextStyleFlyweightFactory._instance;
  };

  TextStyleFlyweightFactory.prototype.getTextStyleFlyweight = function (name) {
    var textStyle = this.pool[name];
    return textStyle;
  };

  TextStyleFlyweightFactory.prototype.putTextStyleFlyweight = function (
    name,
    textStyle
  ) {
    this.pool[name] = textStyle;
  };

  TextStyleFlyweightFactory.prototype.toString = function () {
    return 'TextStyleFlyweightFactory';
  };

  return TextStyleFlyweightFactory;
})();
