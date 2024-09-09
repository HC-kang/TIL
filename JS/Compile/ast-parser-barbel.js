const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = `
function add(a, b) {
    return a + b;
}

console.log(add(2, 3));
`;

// 자바스크립트 코드를 AST로 파싱
const ast = parser.parse(code);

// AST를 JSON 형태로 변환하여 출력
console.log(JSON.stringify(ast, null, 2));

// AST를 순회하면서 노드에 접근하기
traverse(ast, {
  enter(path) {
    console.log(path.node.type);
  }
});

// AST를 다시 자바스크립트 코드로 변환
const output = generate(ast, {}, code);
// console.log(output.code);
