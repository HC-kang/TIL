class Subject {
  constructor() {
    this._observers = [];
  }

  add(observer) {
    this._observers.push(observer);
  }

  remove(observer) {
    let idx = this._observers.indexOf(observer);
    if (idx !== -1) {
      this._observers.splice(idx, 1);
    }
  }

  notify(status) {
    this._observers.forEach((observer) => observer.update(status));
  }
}

class User extends Subject {
  constructor() {
    super();
    this._state = {
      name: 'John Doe',
      isLogin: false,
    };
  }

  getName() {
    return this._state.name;
  }

  isLogin() {
    return this._state.isLogin;
  }

  login(name) {
    this._state.name = name;
    this._state.isLogin = true;
    this.notify(this._state);
  }

  logout() {
    this._state.name = '';
    this._state.isLogin = false;
    this.notify(this._state);
  }
}

class System {
  constructor() {
    this._token = null;
    this._id = 'System';
  }

  update(status) {
    if (status.isLogin) {
      this._token = [...status.name].reduce((acc, v) => acc + v.charCodeAt(0), 0);
      console.log(`[${this._id}] User ${status.name} is logged in with token ${this._token}`);
    } else {
      this._token = null;
      console.log(`[${this._id}] User ${status.name} is logged out`);
    }
  }
}

let user = new User();
let system = new System();

user.add(system);

user.login('John Doe'); // [System] User John Doe is logged in with token 711
user.logout(); // [System] User  is logged out
user.login('ford'); // [System] User ford is logged in with token 427
