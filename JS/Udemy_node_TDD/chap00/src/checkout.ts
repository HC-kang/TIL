import { itemFactory } from "./item";

export function checkout(itemList: string): number {
  let total = 0;
  for (const itemChar of itemList.split('')) {
    const item = itemFactory(itemChar);
    total += item.getPrice();
  }
  return total;
}
