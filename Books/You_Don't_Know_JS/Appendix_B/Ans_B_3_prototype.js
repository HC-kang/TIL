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
    Object.create(reel),
    Object.create(reel),
    Object.create(reel)
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    const lines = [];

    for (let linePos = -1; linePos <= 1; linePos++) {
      var line = this.reels.map(function getSlot(reel) {
        let slot = Object.create(reel);
        slot.position = (
          reel.symbols.length + reel.position + linePos
        ) % reel.symbols.length;
        return slot.display();
      })
    };
    lines.push(line.join(' | '));
    console.log(lines.join('\n'));
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

