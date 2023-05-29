import { Item } from "./item";

const D_PRICE = 15;

export class D implements Item {
  getPrice(): number {
    return D_PRICE;
  }
}
