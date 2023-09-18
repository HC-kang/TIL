import { Jack } from './IJack';

class PrimitiveJack implements Jack {
  maxHeight: number = 10;
  height: number = 0;
  pump(): void {
    console.log('pumping');
    this.height += 1;
  }

  release(): void {
    console.log('releasing');
    this.height -= 1;
  }

  heightCheck(): number {
    return this.height;
  }
}

const primitiveJack = new PrimitiveJack();
primitiveJack.pump();
primitiveJack.pump();
primitiveJack.pump();
console.log(primitiveJack.heightCheck())
primitiveJack.release();
console.log(primitiveJack.heightCheck())
