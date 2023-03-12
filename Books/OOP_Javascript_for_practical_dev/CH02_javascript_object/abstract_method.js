function Coffee() {
  this.name = "Coffee";
}

Coffee.prototype.getName = function () {
  return this.name;
};

Coffee.prototype.setName = function (name) {
  this.name = name;
};

Coffee.prototype.display = function () {
  console.log(this.name);
};

// Raises an error if a method is not overridden in a sub.
Coffee.prototype.toString = function () {
  throw new Error("You have to implement the method");
};

var coffee = new Coffee();

console.log(coffee.name); // Coffee

console.log(coffee.getName()); // Coffee

coffee.display(); // Coffee

function Espresso() {
  Coffee.call(this);
}

Espresso.prototype = Object.create(Coffee.prototype, {
  constructor: {
    value: Espresso,
    configurable: true,
    enumerable: true,
    writable: true,
  },
});

var espresso = new Espresso();

espresso.setName("Espresso")

console.log(espresso.name) // Espresso

console.log(espresso.getName()); // Espresso

espresso.display(); // Espresso

// console.log(espresso.toString()); // Error: You have to implement the method

Espresso.prototype.toString = function () {
  return "Espresso";
}

console.log(espresso.toString()); // Espresso