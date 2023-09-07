class ColorConsole {
  log(msg) {
    console.log(msg);
  }
}

class RedConsole extends ColorConsole {
  log(msg) {
    console.log(`\x1b[31m${msg}\x1b[0m`);
  }
}

class BlueConsole extends ColorConsole {
  log(msg) {
    console.log(`\x1b[34m${msg}\x1b[0m`);
  }
}

class GreenConsole extends ColorConsole {
  log(msg) {
    console.log(`\x1b[32m${msg}\x1b[0m`);
  }
}

const consoleFactory = (color) => {
  switch (color) {
    case 'red':
      return new RedConsole();
    case 'blue':
      return new BlueConsole();
    case 'green':
      return new GreenConsole();
    default:
      return new ColorConsole();
  }
};

const redConsole = consoleFactory('red');
redConsole.log('red');

const blueConsole = consoleFactory('blue');
blueConsole.log('blue');

const greenConsole = consoleFactory('green');
greenConsole.log('green');

const defaultConsole = consoleFactory();
defaultConsole.log('default');
