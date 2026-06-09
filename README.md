QA Take-Home Assignment
This project contains API tests written in TypeScript using Playwright, targeting:
    - Front end Flows (https://www.saucedemo.com)
    - API Flows (https://dummyjson.com)

Objective
The goal was to validate the following flow for the front end:

1. Write a full checkout that contains, at least, two items. Validate the final price.
2. Write a test that sorts the items by name Z-A and validate that the sorting is correct.
3. Write a validation for a failed log in.

The goal was to validate the following flow for the API tests:

1. Perform a successful login.
2. Get a product and validate it's content.
3. For the same user id, create a cart with 3 products. Validate the response.
4. Perform a DELETE operation.
5. Perform 2 negative scenarios of your choice (scenarios must target two different API
endpoints).


## Project Structure

```text
src/
  components/
    HeaderComponent.ts

  data/
    sauceDemoProducts.ts
    sauceDemoUsers.ts
    apiConfig.ts

  pages/
    cartPage.ts
    checkoutPage.ts
    inventoryPage.ts
    loginPage.ts

  types/
    products.ts
    UserCredentials.ts

  utils/
    contractValidators.ts

tests/
  ui/
    checkout.test.ts
    failed-login.test.ts
    sort.test.ts

  api/
    utilValidation.spec.ts
    negativeScenarios.spec.ts
```

## Approach

I kept the solution simple, readable, and structured around clear separation of responsibility.

The project is split into a few small layers:

* **pages** → encapsulate SauceDemo page interactions and assertions
* **components** → contain shared UI elements used across pages, such as the header/cart navigation
* **data** → stores reusable test data such as SauceDemo products, users, and API base URLs
* **types** → defines reusable TypeScript models for users, products, carts, and credentials
* **utils** → contains reusable API client and validation logic
* **tests** → focus on test flow, business behaviour, and high-level assertions

For the UI tests, I used a Page Object style so that selectors and page-specific behaviour are kept out of the test files where possible. The tests should read as user journeys rather than low-level click scripts.

For the API tests, I centralised DummyJSON request logic and response validation so the test files stay focused on the scenario being tested.

I intentionally used deterministic test data rather than random selection. This keeps the tests repeatable, easier to debug, and more reliable in CI.

## Test Coverage

The assignment covers both UI and API test automation.

### UI Testing — SauceDemo

The UI tests cover:

1. **Full checkout flow**

   * log in as a valid user
   * add two products to the basket
   * validate basket contents
   * complete checkout information
   * validate checkout subtotal
   * finish the order
   * validate order completion
   * validate the cart is empty after order completion

2. **Product sorting**

   * sort products by name Z-A
   * validate that the displayed product order matches the expected descending order

3. **Failed login**

   * attempt login with invalid credentials
   * validate that the correct error message is shown

### API Testing — DummyJSON

The API tests cover:

1. **Successful login**

   * fetch valid user credentials
   * perform login
   * validate response status and returned authentication details

2. **Product retrieval**

   * get a product by ID
   * validate response structure and key product content

3. **Cart creation**

   * log in / use the same user context
   * create a cart with three products
   * validate the cart response, product IDs, quantities, and user ID

4. **DELETE operation**

   * perform a delete request
   * validate the delete response

5. **Negative scenarios**

   * invalid login
   * invalid or unauthorized API request scenario

## Running the Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npm test
```

Run only UI tests:

```bash
npm run test:ui
```

Run only API tests:

```bash
npm run test:api
```

## Reporting

Playwright HTML reporting is enabled. After a test run, the report can be opened with:

```bash
npm run report
```

The GitHub Actions workflow also uploads the Playwright report as a pipeline artifact, making failures easier to inspect from CI.

## Assumptions and Notes

* SauceDemo product data is treated as stable test data for this assignment.
* DummyJSON simulates some write operations. Created carts and deleted resources are returned in the response but may not be persisted server-side.
* Tests use deterministic data rather than random product/user selection to keep results repeatable and CI-friendly.
* The solution is intentionally lightweight while still separating UI interactions, API logic, test data, and validation concerns.