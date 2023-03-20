// var obj1 = {
//   outer: function () {
//     console.log(this);
//     var innerFunc = function () {
//       console.log(this);
//     };
//     innerFunc(); // window, global

//     var obj2 = {
//       innerMethod: innerFunc,
//     };
//     obj2.innerMethod(); // obj2
//   },
// };
// obj1.outer(); // obj1

// // ------------------------------
var obj = {
  outer: function () {
    console.log(this); // obj
    var innerFunc1 = function () {
      console.log(this); // window, global
    };
    innerFunc1(); // 직접 호출됨 - window, global

    var self = this; // self 에 obj인 this를 할당
    var innerFunc2 = function () {
      console.log(this); // window, global
      console.log(self); // obj
    };
    innerFunc2(); // 직접 호출되었으나 self에 obj를 할당했기 때문에 obj
  },
};

obj.outer();

// ------------------------------
var obj = {
  outer: function () {
    console.log(this);
    var self = this;
    var innerFunc = () => {
      console.log(self); // obj
      console.log(this); // obj
    };
    innerFunc(); // 화살표 함수는 this를 바인딩하지 않기때문에 self를 활용 할 필요가 없음
  },
};

obj.outer();
