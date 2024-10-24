export class BuyOneGetOneFreeRule implements DiscountRule {
  public calculateDiscountedPrice(quantity: number, unitPrice: number) {
    // return Math.ceil(quantity/2) * unitPrice;

    const remainder = quantity % 2;
    return ((quantity - remainder)/2 + remainder) * unitPrice;
  }
}
