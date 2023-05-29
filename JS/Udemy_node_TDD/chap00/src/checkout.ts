export function checkout(itemList: string): number {
  let total = 0;
  for (const item of itemList.split('')) {
    if (item === 'D') total += 15;
    else if (item === 'C') total += 20;
    else if (item === 'B') total += 30;
    else if (item === 'A') total += 50;
    else throw Error('Unknown Item');
  }
    return total;
}