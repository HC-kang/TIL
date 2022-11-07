// 일반적인 function
function Foo(...args) { //  -> 만능, 무겁고 번거로움
  console.log(this);
  if ($this === window) this.args = args;
  else return args
};

// ----------------------------------------------------------------
// 일반 함수로 사용 -> arrow function 활용
// arrow function -> this 바인딩 불가, 생성자 활용 불가 -> '일반 함수로만 활용 가능'
const FooA = (a, b) => {
  return a+b;
}
console.log(Foo(1, 2));

// ----------------------------------------------------------------
// 생성자 함수로 사용 -> class 활용
// class A {} -> '생성자로만 활용 가능'
const foo = new Foo(3, 4);
console.log(foo);

class FooC {
  constructor(...args) {
    console.log(this);
    if ($this === window)
      this.args = args;
    else
      return args;
  }
};
// ----------------------------------------------------------------
// 객체 메서드로 할당 -> 메서드 축약형
const bar = {
  method: Foo,
}

bar.method(5,6)
console.log(bar);


const bar2 = {
  name: 'hi',
  method() {
    console.log('Foo');
  }
}


// ----------------------------------------------------------------
// generator -> function을 쓸 수 밖에 없음
// <함수형>
function* generator() {
  yield 1
  yield 2
}

console.dir(generator);

const gene = generator()
console.log(gene.next().value) // 1
console.log(gene.next().value) // 2
console.log(gene.next().value) // undefined

// <객체형>
const obj = {
  val: [1, 2],
  *gene() {
    yield this.val.shift();
    yield this.val.shift();
  },
}

const gene_obj = obj.gene();
console.log(gene_obj.next().value) // 1
console.log(gene_obj.next().value) // 2
console.log(gene_obj.next().value) // undefined
