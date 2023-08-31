interface User {
  id: number;
  name: string;
  age: number;
  role: 'admin' | 'customer';
}

interface Beverage {
  name: string;
  price: number;
}

interface Order {
  orderId: number;
  customerId: number;
  customerName: string;
  beverageName: string;
  status: 'placed' | 'completed' | 'picked-up';
}

let beverages: Beverage[] = [];
let orders: Order[] = [];

const isAdmin = (user: User) => user.role === 'admin';
const isCustomer = (user: User) => user.role === 'customer';

const addBeverage = (user: User, name: string, price: number): void => {
  if (!isAdmin(user)) {
    console.error('Only admins can add beverages');
    return;
  }

  const newBeverage: Beverage = { name, price };
  beverages.push(newBeverage);
};

const removeBeverage = (user: User, beverageName: string): void => {
  if (!isAdmin(user)) {
    console.error('Only admins can remove beverages');
    return;
  }

  beverages = beverages.filter((beverage) => beverage.name !== beverageName);
};

const getBeverages = (user: User): Beverage[] => {
  if (!user) {
    console.error('Only customers can get beverages');
    return [];
  }

  return beverages;
};

const findBeverage = (beverageName: string): Beverage | undefined => {
  return beverages.find((beverage) => beverage.name === beverageName);
};

const placeOrder = (user: User, beverageName: string): number => {
  if (!isCustomer(user)) {
    console.error('Only customers can place orders');
    return -1;
  }

  const beverage = findBeverage(beverageName);

  if (!beverage) {
    console.error('Beverage not found');
    return -1;
  }

  const newOrder: Order = {
    orderId: orders.length + 1,
    customerId: user.id,
    customerName: user.name,
    beverageName: beverage.name,
    status: 'placed',
  };

  orders.push(newOrder);

  return newOrder.orderId;
};

const completeOrder = (user: User, orderId: number): void => {
  if (!isAdmin(user)) {
    console.error('Only admins can complete orders');
    return;
  }

  const order = orders.find((order) => order.orderId === orderId);

  if (!order) {
    console.error('Order not found');
    return;
  }

  order.status = 'completed';
  console.log(`Order ${order.orderId} completed`);
  return;
};

const pickupOrder = (user: User, orderId: number): void => {
  if (!isCustomer(user)) {
    console.error('Only customers can pickup orders');
    return;
  }

  const order = orders.find(
    (order) =>
      order.orderId === orderId &&
      order.customerId === user.id &&
      order.status === 'completed'
  );
  if (!order) {
    console.error('Order not found');
    return;
  }

  order.status = 'picked-up';
  console.log(`Order ${order.orderId} picked up`);
  return;
};


function main() {
  const admin: User = {
    id: 1,
    name: 'admin',
    age: 30,
    role: 'admin',
  };

  const customer: User = {
    id: 2,
    name: 'customer',
    age: 20,
    role: 'customer',
  };

  const customer2: User = {
    id: 3,
    name: 'customer2',
    age: 20,
    role: 'customer',
  };

  addBeverage(admin, 'latte', 5);
  addBeverage(admin, 'americano', 3);
  addBeverage(admin, 'mocha', 4);

  const beverages = getBeverages(customer);
  console.log(beverages);

  const orderId = placeOrder(customer, 'latte');
  completeOrder(admin, orderId);
  pickupOrder(customer, orderId);

  const orderId2 = placeOrder(customer2, 'americano');
  completeOrder(admin, orderId2);
  pickupOrder(customer2, orderId2);
}

main();