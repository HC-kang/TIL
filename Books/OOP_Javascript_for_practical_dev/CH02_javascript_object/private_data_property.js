var coffee = (function () {
  var _name = "Americano";
  return {
      get name() {
          return _name;
      },
      set name(value) {
          console.log("call setter")
          _name = value;
      }
  }
}());

console.log(coffee.name); // Americano

console.log(coffee._name); // undefined

coffee.name = "Cappuccino";

console.log(coffee.name); // Cappuccino