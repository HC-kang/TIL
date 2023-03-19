const personBuilder = (name, age) => {
  return person = {
    name,
    age,
    sayHello() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }
}

const ford = personBuilder('ford', 31);
const stella = personBuilder('stella', 30);

ford.sayHello(); // Hello, my name is ford
stella.sayHello(); // Hello, my name is stella
ford.sayHello.call(stella); // Hello, my name is stella -> this를 stella로 가져감
stella.sayHello.call(ford); // Hello, my name is ford -> this를 ford 가져감

// ----------------------------------------------------------------

const personBuilderArrow = (name, age) => {
  return person = {
    name,
    age,
    sayHello: () => {
      console.log(`Hello, my name is ${this.name}`);
    }
  }
}

const fordArrow = personBuilderArrow('ford', 31);
const stellaArrow = personBuilderArrow('stella', 30);

fordArrow.sayHello();
stellaArrow.sayHello();