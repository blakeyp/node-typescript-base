export class Checkout {
  private basket = new Map<String,number>();

  constructor(private priceList: Map<String,number>) {}

  public scan(itemCode: String): void {
    if (this.basket.has(itemCode)) {
      const quantity = this.basket.get(itemCode)! + 1;
      this.basket.set(itemCode, quantity);
    } else {
      this.basket.set(itemCode, 1);
    }
  }

  public total(): number {
    let total = 0;
    this.basket.forEach((value, key) => {
      const price = this.priceList.get(key);
      if (price === undefined) {
        throw new Error('Item not found in price list');
      }
      const quantity = value;
      total += price * quantity;
    });
    return total;
  }

}
