function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: ['♠', '♥', '♦', '♣', '☺', '★', '☾', '☀'],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  }
};

var slotMachine = {
  reels: [
    // TODO
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    // TODO
  }
};

slotMachine.spin();
slotMachine.display();
// ☀ | ☾ | ♠
// ☾ | ♠ | ♠
// ♠ | ♥ | ☺

slotMachine.spin();
slotMachine.display();
// ♠ | ♠ | ♠
// ♠ | ♠ | ♠
// ♠ | ♠ | ♠

