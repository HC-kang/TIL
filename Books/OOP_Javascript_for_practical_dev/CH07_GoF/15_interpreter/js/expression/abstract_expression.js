
CALC.createNameSpace("CALC.interpreter.expression.AbstractExpression");

CALC.interpreter.expression.AbstractExpression = (function() {
	
	var AbstractExpression;
	
	AbstractExpression = function () {
		
	};
	
	AbstractExpression.prototype.parse = function(context) {
		throw new Error("You have to implement the method doSomething!");
	};
	
	AbstractExpression.prototype.operate = function() {
		
	};
	
	AbstractExpression.prototype.toString = function() {
	    return "AbstractExpression";
	};
	
	return AbstractExpression;
	
}());
