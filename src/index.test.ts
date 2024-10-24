import { BuyOneGetOneFreeRule } from "./BuyOneGetOneFreeRule";
import { Checkout } from "./Checkout";

describe('Checkout', () => {
  const priceList = new Map([
    ['FR1', 3.11],
    ['SR1', 5.00],
    ['CF1', 11.23],
  ]);

  const discountRules = new Map([
    ['FR1', new BuyOneGetOneFreeRule()]
  ])

  describe('total', () => {
    test('throws error when item not found in price list', () => {
      const priceListMissingItem = new Map([
        ['FR1', 5.00]
      ]);
      const co = new Checkout(priceListMissingItem, discountRules);
      co.scan('FR1');
      try {
        co.total();
        fail();
      } catch (error) {
        expect(error.message).toBe('Item not found in price list');
      }
    });

    test('scan nothing', () => {
      const co = new Checkout(priceList, discountRules);
      expect(co.total()).toBeCloseTo(0, 2);
    });

    test('FR1', () => {
      const co = new Checkout(priceList, discountRules);
      co.scan('FR1');
      expect(co.total()).toBeCloseTo(3.11, 2);
    });

    test('CF1, CF1, CF1', () => {
      const co = new Checkout(priceList, discountRules);
      co.scan('CF1');
      co.scan('CF1');
      co.scan('CF1');
      expect(co.total()).toBeCloseTo(33.69, 2);
    });

    test('FR1, SR1, FR1, FR1, CF1', () => {
      const co = new Checkout(priceList, discountRules);
      co.scan('FR1');
      co.scan('SR1');
      co.scan('FR1');
      co.scan('FR1');
      co.scan('CF1');
      expect(co.total()).toBeCloseTo(22.45, 2);
    });

    test('FR1, FR1', () => {
      const co = new Checkout(priceList, discountRules);
      co.scan('FR1');
      co.scan('FR1');
      expect(co.total()).toBeCloseTo(3.11, 2);
    });

    test('SR1, SR1, FR1, SR1', () => {
      const co = new Checkout(priceList, discountRules);
      co.scan('SR1');
      co.scan('SR1');
      co.scan('FR1');
      co.scan('SR1');
      expect(co.total()).toBeCloseTo(16.61, 2);
    });
  });
});
