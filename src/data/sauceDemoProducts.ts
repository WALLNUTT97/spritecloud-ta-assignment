import { sauceDemoProducts } from '../types/products';

export const sauceDemoProductInfo = {
  backpack: {
    productButtonTestId: 'item-4-title-link',
    productButtonLabel: 'sauce-labs-backpack',
  },
  bikeLight: {
    productButtonTestId: 'item-0-title-link',
    productButtonLabel: 'sauce-labs-bike-light',
  },
  boltTShirt: {
    productButtonTestId: 'item-1-title-link',
    productButtonLabel: 'sauce-labs-bolt-t-shirt',
  },
  FleeceJacket: {
    productButtonTestId: 'item-5-title-link',
    productButtonLabel: 'sauce-labs-fleece-jacket',
  },
  Onesie: {
    productButtonTestId: 'item-2-title-link',
    productButtonLabel: 'sauce-labs-onesie',
  },
  tShirtRed: {
    productButtonTestId: 'item-3-title-link',
    productButtonLabel: 'test.allthethings()-t-shirt-(red)',
  },
} satisfies Record<string, sauceDemoProducts>;