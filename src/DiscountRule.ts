interface DiscountRule {
  calculateDiscountedPrice(quantity: number, unitPrice: number): number;
}
