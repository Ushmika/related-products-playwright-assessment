const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Related Products Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.ebay.com/itm/195060516753');
  });

  test('TC01 - Related section appears', async ({ page }) => {
    const productPage = new ProductPage(page);
    expect(await productPage.isRelatedSectionVisible()).toBeTruthy();
  });

  test('TC02 - Max 6 related products shown', async ({ page }) => {
    const productPage = new ProductPage(page);
    const count = await productPage.getRelatedProductCount();
    expect(count).toBeLessThanOrEqual(6);
  });

  test('TC03 - Related products from same category', async ({ page }) => {
    const productPage = new ProductPage(page);
    const categories = await productPage.getRelatedProductCategories();
    expect(new Set(categories).size).toBe(1);
  });

  test('TC04 - Price range within ±20%', async ({ page }) => {
    const productPage = new ProductPage(page);
    const prices = await productPage.getRelatedProductPrices();
    const mainPrice = await productPage.getMainProductPrice();
    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(mainPrice * 0.8);
      expect(price).toBeLessThanOrEqual(mainPrice * 1.2);
    }
  });

  test('TC05 - Best Seller tag present', async ({ page }) => {
    const productPage = new ProductPage(page);
    const tags = await productPage.getBestSellerTags();
    expect(tags.every(tag => tag.includes('Best Seller'))).toBeTruthy();
  });

  test('TC06 - No related products message', async ({ page }) => {
    await page.goto('https://www.ebay.com/itm/no-related-product-id');
    const productPage = new ProductPage(page);
    expect(await productPage.getNoRelatedMessage()).toContain('No related products');
  });

  test('TC07 - Less than 6 related products', async ({ page }) => {
    const productPage = new ProductPage(page);
    const count = await productPage.getRelatedProductCount();
    expect(count).toBeLessThanOrEqual(6);
  });

  test('TC08 - Clicking related product opens correct page', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productName = await productPage.clickFirstRelatedProduct();
    const title = await page.textContent('.main-product-title');
    expect(title).toContain(productName);
  });

  test('TC09 - Responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const productPage = new ProductPage(page);
    expect(await productPage.isLayoutResponsive()).toBeTruthy();
  });

  test('TC10 - Product title and image displayed', async ({ page }) => {
    const productPage = new ProductPage(page);
    const titles = await productPage.getRelatedProductTitles();
    const images = await productPage.getRelatedProductImages();
    expect(titles.every(t => t.length > 0)).toBeTruthy();
    expect(images.every(src => src.includes('http'))).toBeTruthy();
  });
});
