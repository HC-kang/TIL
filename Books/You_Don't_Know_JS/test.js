if (true) {
  function ask() {
    console.log('me?')
  }
}

if (true) {
  function ask() {
    console.log('or me?')
  }
}

for (let i = 0; i < 1; i++) {
  function ask() {
    console.log('maybe me?')
  }
}
let a = true;
while(a) {
  function ask() {
    console.log('or maybe me?')
  }
  a = false;
}

ask();

function ask() {
  console.log('definitely me!')
}