import { Jack } from './IJack';

class Fluid {
  constructor(public volume: number) {}
}

interface Tank {
  maxVolume: number;
  volume: number;
  pressure: number;
  fillOrDrain(value: number): void;
}

class Pipe {
  constructor(public endpoint1: Tank, public endpoint2: Tank, public ingredients = []) {};
  transfer(value: number): void {
    if (this.endpoint1.pressure > this.endpoint2.pressure) {
      this.endpoint1.fillOrDrain(-value);
      this.endpoint2.fillOrDrain(value);
    } else {
      this.endpoint1.fillOrDrain(value);
      this.endpoint2.fillOrDrain(-value);
    }
  }
}

class Cylinder implements Tank {
  maxVolume: number;
  volume: number = 0;
  pressure: number = 1;
  constructor(public height: number, public area: number) {
    this.maxVolume = height * area;
  }
  fillOrDrain(value: number): void {
    console.log('transferring');
    this.volume += value;
  }
}

class OilPressureJack implements Jack {
  maxHeight: number = 0;
  height: number = 0;

  constructor(
    private fluidTank: Tank,
    private masterCylinder: Cylinder,
    private slaveCylinder: Cylinder,
    private pipeBtwnCylinders: Pipe,
    private pipeBtwnMasterAndTank: Pipe,
    private pipeBtwnSlaveAndTank: Pipe
  ) {
    this.maxHeight = masterCylinder.height;
  }
  pump(): void {
    console.log('pumping');
    this.height +=
      (this.slaveCylinder.area * this.slaveCylinder.height) /
      this.masterCylinder.area;
  }

  release(): void {
    console.log('releasing');
    this.height -= 1;
  }

  heightCheck(): number {
    return this.height;
  }
}

const masterCylinder = new Cylinder(30, 10);
const slaveCylinder = new Cylinder(10, 1);
const oilPressureJack = new OilPressureJack(masterCylinder, slaveCylinder);

console.log(oilPressureJack.heightCheck());
for (let i = 0; i < 20; i++) {
  oilPressureJack.pump();
}
console.log(oilPressureJack.heightCheck());
for (let i = 0; i < 5; i++) {
  oilPressureJack.pump();
}
console.log(oilPressureJack.heightCheck());
