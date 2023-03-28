var CALC = CALC || {};

CALC.createNameSpace = function(nsValue) {
	var parts = nsValue.split("."),
		parent = CALC,
		i;
	
	if(parts[0] === "CALC") {
		parts = parts.slice(1);
	}
	
	for(i = 0; i < parts.length; i += 1) {
		if(typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		
		parent = parent[parts[i]];
	}
	
	return parent;
}
