import { sauceDemoProducts } from '../types/products';

export const SauceDemoProductInfo = {
  backpack: {
    productProductPageLink: 'item-4-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-backpack',
    removeFromCartTestId: 'remove-sauce-labs-backpack',
  },
  bikeLight: {
    productProductPageLink: 'item-0-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-bike-light',
    removeFromCartTestId: 'remove-sauce-labs-bike-light',
  },
  boltTShirt: {
    productProductPageLink: 'item-1-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-bolt-t-shirt',
    removeFromCartTestId: 'remove-sauce-labs-bolt-t-shirt',
  },
  FleeceJacket: {
    productProductPageLink: 'item-5-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-fleece-jacket',
    removeFromCartTestId: 'remove-sauce-labs-fleece-jacket',
  },
  Onesie: {
    productProductPageLink: 'item-2-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-onesie',
    removeFromCartTestId: 'remove-sauce-labs-onesie',
  },
  tShirtRed: {
    productProductPageLink: 'item-3-title-link',
    addToCartTestId: 'add-to-cart-test.allthethings()-t-shirt-(red)',
    removeFromCartTestId: 'remove-test.allthethings()-t-shirt-(red)',
  },
} satisfies Record<string, sauceDemoProducts>;