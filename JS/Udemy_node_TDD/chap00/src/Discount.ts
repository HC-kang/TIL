import { ItemType } from "./item";

export class Discount {
  constructor(
    private itemType: ItemType,
    private quantity: number,
    private discount: number
  ) {}

  calculateDiscount(itemList: string): number {
    const A_counter = itemList
      .split('')
      .filter((item) => item === this.itemType).length;
    return Math.trunc(A_counter / this.quantity) * this.discount;
  }
}