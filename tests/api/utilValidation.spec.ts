import { test, expect } from '@playwright/test';
import { DummyJSONApiClient } from '../../src/utils/DummyJSONApiClient';
import { DummyJSONCartProduct } from '../../src/types/products';

const productId = 1;
const userId = 1;


test.describe('DummyJSON API happy path tests', () => {
  test('1. Perform successful login', async ({ request }) => {
        const userClient = new DummyJSONApiClient(request);
        const credentials = await userClient.getLoginCredentialsForUser(userId);
        await userClient.login(credentials);
    })

  test('2. Get a product and validate its content', async ({ request }) => {
    const userClient = new DummyJSONApiClient(request);
    const product = await userClient.getProductById(productId);
    await userClient.validateProductContents(product, productId);
  });

  test('3. Create a cart with 3 products and validate its content', async ({ request }) => {
    const userClient = new DummyJSONApiClient(request);
    const cartProducts: DummyJSONCartProduct[] = [];

    const credentials = await userClient.getLoginCredentialsForUser(userId);
    await userClient.login(credentials);
    for (let productId = 1; productId <= 3; productId++) {
      const productResponse = await userClient.getProductById(productId);
      cartProducts.push({
        id: productResponse.id,
        quantity: 1,
      });
    }
    await userClient.addProductToNewCart(credentials.id, cartProducts)
  });

  test('4. Perform a delete operation', async ({ request }) => {
    const userClient = new DummyJSONApiClient(request);
    await userClient.deleteProduct(productId)
  });
});