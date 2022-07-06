class Latte {
    constructor() {
        this.name = "latte"
    }
}

class Espresso {
    constructor() {
        this.name = "Espresso"
    }
}

class LatteFactory {
    static createCoffee() {
        return new Latte()
    }
}

class EspressoFactory {
    static createCoffee() {
        return new Espresso()
    }
}

const factoryList = { LatteFactory, EspressoFactory }

class CoffeeFactory {
    static createCoffee(type) {
        const factory = factoryList[type]
        return factory.createCoffee()
    }
}

const main = () => {
    // Order Latte
    const coffee = CoffeeFactory.createCoffee("LatteFactory")
    // Call coffee name
    console.log(coffee.name)
}

main()