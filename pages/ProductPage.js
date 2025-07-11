class ProductPage {
  constructor(page) {
    this.page = page;
    this.relatedSection = '.related-products';
    this.productCard = '.related-products .product-card';
    this.category = '.product-category';
    this.price = '.product-price';
    this.mainPrice = '.main-product .price';
    this.bestSellerTag = '.best-seller';
    this.noRelatedMsg = '.no-related-message';
    this.productTitle = '.product-title';
    this.productImage = '.product-image';
  }

  async isRelatedSectionVisible() {
    return await this.page.isVisible(this.relatedSection);
  }

  async getRelatedProductCount() {
    return (await this.page.$$(this.productCard)).length;
  }

  async getRelatedProductCategories() {
    const elements = await this.page.$$(this.category);
    return Promise.all(elements.map(el => el.textContent()));
  }

  async getRelatedProductPrices() {
    const elements = await this.page.$$(this.price);
    const prices = await Promise.all(elements.map(el => el.textContent()));
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async getMainProductPrice() {
    const priceText = await this.page.textContent(this.mainPrice);
    return parseFloat(priceText.replace('$', ''));
  }

  async getBestSellerTags() {
    const tags = await this.page.$$(this.bestSellerTag);
    return Promise.all(tags.map(tag => tag.textContent()));
  }

  async getNoRelatedMessage() {
    return await this.page.textContent(this.noRelatedMsg);
  }

  async clickFirstRelatedProduct() {
    const first = await this.page.$(`${this.productCard} >> nth=0`);
    const name = await first.textContent();
    await first.click();
    await this.page.waitForLoadState('networkidle');
    return name;
  }

  async isLayoutResponsive() {
    return await this.page.isVisible(this.relatedSection);
  }

  async getRelatedProductTitles() {
    const titles = await this.page.$$(this.productTitle);
    return Promise.all(titles.map(t => t.textContent()));
  }

  async getRelatedProductImages() {
    const images = await this.page.$$(this.productImage);
    return Promise.all(images.map(img => img.getAttribute('src')));
  }
}

module.exports = { ProductPage };
