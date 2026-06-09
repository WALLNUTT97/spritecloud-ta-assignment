import { APIRequestContext, expect } from "@playwright/test";
import { DummyJSONCredentials } from "../types/UserCredentials";
import { apiConfig } from "../config/apiConfig";
import { DummyJSONProduct, DummyJSONCartProduct } from "../types/products";

export class DummyJSONApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getLoginCredentialsForUser(
    userId: number,
  ): Promise<DummyJSONCredentials> {
    const response = await this.request.get(
      `${apiConfig.dummyJsonBaseUrl}/users/${userId}`,
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    return {
      username: user.username,
      password: user.password,
      id: user.id,
      expiresInMins: 30,
    };
  }

  async login(credentials: DummyJSONCredentials) {
    const response = await this.request.post(
      `${apiConfig.dummyJsonBaseUrl}/auth/login`,
      {
        data: credentials,
      },
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("accessToken");
    expect(responseBody).toHaveProperty("username", credentials.username);
    expect(responseBody).toHaveProperty("id", credentials.id);
  }

  async getProductById(productId: number) {
    const response = await this.request.get(
      `${apiConfig.dummyJsonBaseUrl}/products/${productId}`,
    );
    const productDetails = await response.json();
    return productDetails;
  }

  async validateProductContents(
    productDetails: DummyJSONProduct,
    expectedProductId?: number,
  ) {
    //With this validation, we are making the assumption that not all products returned by the API will adhere to the same structure,
    // and that the presence of certain key properties (like id, title, description, price, stock) can be used as indicators of a valid product response.
    expect(productDetails).toMatchObject(dummyJSONProductShape);
    expect(productDetails.id).toBe(expectedProductId);
    expect(productDetails.title.trim().length).toBeGreaterThan(0);
    expect(productDetails.description.trim().length).toBeGreaterThan(0);
    expect(productDetails.category.trim().length).toBeGreaterThan(0);
    expect(productDetails.price).toBeGreaterThan(0);
    expect(productDetails.stock).toBeGreaterThanOrEqual(0);
  }

  async addProductToNewCart(userId: number, products: DummyJSONCartProduct[]) {
    const response = await this.request.post(
      `${apiConfig.dummyJsonBaseUrl}/carts/add`,
      {
        data: {
          userId,
          products,
        },
      },
    );
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("userId", userId);
    expect(responseBody).toHaveProperty("userId", userId);
    for (let i = 0; i < products.length; i++) {
      expect(responseBody.products[i]).toHaveProperty("id", products[i].id);
      expect(responseBody.products[i]).toHaveProperty(
        "quantity",
        products[i].quantity,
      );
    }
    const cartId = responseBody.id;
    return cartId;
  }

  async deleteProduct(productId: number) {
    const response = await this.request.delete(
      `${apiConfig.dummyJsonBaseUrl}/products/${productId}`,
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("id", productId);
    expect(responseBody).toHaveProperty("isDeleted", true);
    expect(Date.parse(responseBody.deletedOn)).not.toBeNaN();
    /* const fetchProduct = await this.request.get(`${apiConfig.dummyJsonBaseUrl}/products/${productId}`)
    expect(fetchProduct.status()).toBe(404); */
    //This is a limitation of DummyJSON, in reality it should be deleted, but as stated on their documenatation, delete operations do not actually delete the record, just simulate it in API response
  }
}

export const dummyJSONProductShape = {
  id: expect.any(Number),
  title: expect.any(String),
  description: expect.any(String),
  category: expect.any(String),
  price: expect.any(Number),
  discountPercentage: expect.any(Number),
  rating: expect.any(Number),
  stock: expect.any(Number),
  tags: expect.any(Array),
  brand: expect.any(String),
  sku: expect.any(String),
  weight: expect.any(Number),
  dimensions: {
    width: expect.any(Number),
    height: expect.any(Number),
    depth: expect.any(Number),
  },
  warrantyInformation: expect.any(String),
  shippingInformation: expect.any(String),
  availabilityStatus: expect.any(String),
  reviews: expect.any(Array),
  returnPolicy: expect.any(String),
  minimumOrderQuantity: expect.any(Number),
  meta: {
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    barcode: expect.any(String),
    qrCode: expect.any(String),
  },
  thumbnail: expect.any(String),
  images: expect.any(Array),
};
