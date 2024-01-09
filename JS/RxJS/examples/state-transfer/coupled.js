class User {
  constructor() {
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
  }

  logout() {
    this._state.name = '';
    this._state.isLogin = false;
  }
}

class System {
  constructor(user) {
    this._token = null;
    this._id = 'System';
    this._user = user;
  }

  check() {
    const username = this._user.getName();
    if (this._user.isLogin()) {
      this._token = [...username].reduce((acc, v) => acc + v.charCodeAt(0), 0);
      console.log(`[${this._id}] User ${username} is logged in with token ${this._token}`);
    } else {
      this._token = null;
      console.log(`[${this._id}] User ${username} is logged out`);
    }
  }
}

let user = new User();
let system = new System(user);

system.check(); // [System] User John Doe is logged out

user.login('John Doe');

system.check(); // [System] User John Doe is logged in with token 711

user.logout();

system.check(); // [System] User  is logged out