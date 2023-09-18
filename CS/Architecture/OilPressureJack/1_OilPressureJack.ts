import { Jack } from './IJack';

class Cylinder {
  constructor(public height: number, public area: number) {}
}

class OilPressureJack implements Jack {
  maxHeight: number = 0;
  height: number = 0;

  constructor(
    private masterCylinder: Cylinder,
    private slaveCylinder: Cylinder
  ) {
    this.maxHeight = masterCylinder.height;
  }
  pump(): void {
    console.log('pumping');
    this.height +=
      (this.slaveCylinder.area * this.slaveCylinder.height) / this.masterCylinder.area;
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
