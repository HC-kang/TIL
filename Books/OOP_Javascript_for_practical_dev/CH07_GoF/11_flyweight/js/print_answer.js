CALC.createNameSpace('CALC.flyweight.PrintAnswer');

CALC.flyweight.PrintAnswer = (function () {
  var PrintAnswer;

  PrintAnswer = function (name, size) {
    var TextStyleFlyweightFactory = CALC.flyweight.TextStyleFlyweightFactory;

    this.textStyleFlyweightFactory = TextStyleFlyweightFactory.getInstance();
    this.firstNumber = 0;
    this.secondNumber = 0;
  };

  PrintAnswer.prototype.printResult = function () {
    var FlyweightConstants = CALC.flyweight.FlyweightConstants;

    var answers = [0, 0, 0, 0];

    answers[0] = this.firstNumber + this.secondNumber;
    answers[1] = this.firstNumber - this.secondNumber;
    answers[2] = this.firstNumber * this.secondNumber;
    answers[3] = this.firstNumber / this.secondNumber;

    for (var i = 0; i < answers.length; i++) {
      var operator = FlyweightConstants.OPERATORS[i];
      var textArray = ['', '', '', '', ''];
      textArray[0] =
        '' +
        this.firstNumber +
        this.getTextStyle(FlyweightConstants.NUMBER_STYLE_NAME);
      textArray[1] = operator;
      textArray[2] =
        '' +
        this.secondNumber +
        this.getTextStyle(FlyweightConstants.NUMBER_STYLE_NAME);
      textArray[3] = FlyweightConstants.EQUAL_CHAR;
      textArray[4] =
        '' +
        answers[i] +
        this.getTextStyle(FlyweightConstants.NUMBER_STYLE_NAME);

      console.log(
        textArray[0],
        textArray[1],
        textArray[2],
        textArray[3],
        textArray[4]
      );
    }
  };

  PrintAnswer.prototype.getTextStyle = function (name) {
    return this.textStyleFlyweightFactory.getTextStyleFlyweight(name);
  };

  PrintAnswer.prototype.setFirstNumber = function (firstNumber) {
    this.firstNumber = firstNumber;
  };

  PrintAnswer.prototype.setSecondNumber = function (secondNumber) {
    this.secondNumber = secondNumber;
  };

  PrintAnswer.prototype.toString = function () {
    return '(' + this.name + ', ' + this.size + ')';
  };

  return PrintAnswer;
})();
