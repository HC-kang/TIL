CALC.createNameSpace('CALC.flyweight.Client');

CALC.flyweight.Client = (function () {
  var Client;

  Client = function () {};

  Client.prototype.setupTextStyleFlyweightFactory = function () {
    var TextStyleFlyweightFactory = CALC.flyweight.TextStyleFlyweightFactory;
    var FlyweightConstants = CALC.flyweight.FlyweightConstants;
    var TextStyleFlyweight = CALC.flyweight.TextStyleFlyweight;

    var textStyleFlyweightFactory = TextStyleFlyweightFactory.getInstance();

    var name = FlyweightConstants.NUMBER_STYLE_NAME;
    var textStyle = new TextStyleFlyweight(
      FlyweightConstants.DEFAULT_NUMBER_FONT_INFO,
      'red'
    );
    textStyleFlyweightFactory.putTextStyleFlyweight(name, textStyle);

    name = FlyweightConstants.ANSWER_STYLE_NAME;
    textStyle = new TextStyleFlyweight(
      FlyweightConstants.DEFAULT_ANSWER_FONT_INFO,
      'black'
    );
    textStyleFlyweightFactory.putTextStyleFlyweight(name, textStyle);
  };

  Client.prototype.toString = function () {
    return 'Client';
  };

  return Client;
})();
