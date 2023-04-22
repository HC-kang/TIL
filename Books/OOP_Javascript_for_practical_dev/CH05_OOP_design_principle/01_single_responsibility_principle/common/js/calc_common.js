/**
 * 전역공간 내 변수의 충돌 및 덮어쓰기 방지를 위한 네임스페이스 생성 함수
 */
var CALC = CALC || {}; // CALC 변수 덮어쓰기 방지

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
