import { Item } from "./item";

const B_PRICE = 30;

export class B implements Item {
  getPrice(): number {
    return B_PRICE;
  }
}
