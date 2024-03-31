// var seconds = 0;

function Timer () {
  this.seconds = 0;
  
  /**
   * 정상동작하는 타이머
   */
  this.timer = () => {
    setInterval(() => {
      this.seconds++;
      console.log('timer1: ', this.seconds);
    }, 1000);
  }

  /**
   * 예상대로 동작하지 않음.
   * Node.js에서는 NaN이 출력되고, 브라우저에서는 전역변수의 유무에 따라 1초마다 1씩 증가하는 것처럼 보임.
   */
  this.timer2 = () => {
    setInterval(function() {
      this.seconds++;
      console.log('timer2: ', this.seconds);
    }, 1000);
  }

  /**
   * 정상동작하는 타이머(bind 사용)
   */
  this.timer3 = () => {
    setInterval(function() {
      this.seconds++;
      console.log('timer3: ', this.seconds);
    }.bind(this), 1000);
  }

  /**
   * 정상동작하는 타이머(클로저 사용)
   */
  this.timer4 = () => {
    const self = this;
    setInterval(function() {
      self.seconds++;
      console.log('timer4: ', self.seconds);
    }, 1000);
  }
}

const timer = new Timer();
// timer.timer();
// timer.timer2();
// timer.timer3();
timer.timer4();