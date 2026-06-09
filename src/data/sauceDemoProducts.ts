import { SauceDemoProduct } from "../types/products";

export const SauceDemoProductInfo = {
  backpack: {
    name: "Sauce Labs Backpack",
    price: 29.99,
    productProductPageLink: "item-4-title-link",
    addToCartTestId: "add-to-cart-sauce-labs-backpack",
    removeFromCartTestId: "remove-sauce-labs-backpack",
  },
  bikeLight: {
    name: "Sauce Labs Bike Light",
    price: 9.99,
    productProductPageLink: "item-0-title-link",
    addToCartTestId: "add-to-cart-sauce-labs-bike-light",
    removeFromCartTestId: "remove-sauce-labs-bike-light",
  },
  boltTShirt: {
    name: "Sauce Labs Bolt T-Shirt",
    price: 15.99,
    productProductPageLink: "item-1-title-link",
    addToCartTestId: "add-to-cart-sauce-labs-bolt-t-shirt",
    removeFromCartTestId: "remove-sauce-labs-bolt-t-shirt",
  },
  fleeceJacket: {
    name: "Sauce Labs Fleece Jacket",
    price: 49.99,
    productProductPageLink: "item-5-title-link",
    addToCartTestId: "add-to-cart-sauce-labs-fleece-jacket",
    removeFromCartTestId: "remove-sauce-labs-fleece-jacket",
  },
  onesie: {
    name: "Sauce Labs Onesie",
    price: 7.99,
    productProductPageLink: "item-2-title-link",
    addToCartTestId: "add-to-cart-sauce-labs-onesie",
    removeFromCartTestId: "remove-sauce-labs-onesie",
  },
  tShirtRed: {
    name: "Test.allTheThings() T-Shirt (Red)",
    price: 15.99,
    productProductPageLink: "item-3-title-link",
    addToCartTestId: "add-to-cart-test.allthethings()-t-shirt-(red)",
    removeFromCartTestId: "remove-test.allthethings()-t-shirt-(red)",
  },
} satisfies Record<string, SauceDemoProduct>;

export const SortDirections = {
  nameDescending: "za",
  nameAscending: "az",
  priceLowHigh: "lohi",
  priceHighLow: "hilo",
};
