import { Checkout } from "./Checkout";

describe('Checkout', () => {
  const priceList = new Map([
    ['FR1', 3.11],
    ['SR1', 5.00],
    ['CF1', 11.23],
  ]);

  describe('total', () => {
    test('throws error when item not found in price list', () => {
      const priceListMissingItem = new Map([
        ['SR1', 5.00]
      ]);
      const co = new Checkout(priceListMissingItem);
      co.scan('FR1');
      expect(() => co.total()).toThrow(new Error('Item not found in price list'));
    });

    test('scan nothing', () => {
      const co = new Checkout(priceList);
      expect(co.total()).toBeCloseTo(0);
    });

    test('FR1', () => {
      const co = new Checkout(priceList);
      co.scan('FR1');
      expect(co.total()).toBeCloseTo(3.11);
    });

    test('CF1, CF1, CF1', () => {
      const co = new Checkout(priceList);
      co.scan('CF1');
      co.scan('CF1');
      co.scan('CF1');
      expect(co.total()).toBeCloseTo(33.69);
    });

    test('FR1, SR1, FR1, FR1, CF1', () => {
      const co = new Checkout(priceList);
      co.scan('FR1');
      co.scan('SR1');
      co.scan('FR1');
      co.scan('FR1');
      co.scan('CF1');
      expect(co.total()).toBeCloseTo(22.45);
    });

    test('FR1, FR1', () => {
      const co = new Checkout(priceList);
      co.scan('FR1');
      co.scan('FR1');
      expect(co.total()).toBeCloseTo(3.11);
    });

    test('SR1, SR1, FR1, SR1', () => {
      const co = new Checkout(priceList);
      co.scan('SR1');
      co.scan('SR1');
      co.scan('FR1');
      co.scan('SR1');
      expect(co.total()).toBeCloseTo(16.61);
    });
  });
});
