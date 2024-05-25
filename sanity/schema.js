import { heroBanner } from "./schemas/hero-banner";
import { orders } from "./schemas/orders";
import { product } from "./schemas/product-schema";
import { siteInfo } from "./schemas/site-info";
import { ads } from "./schemas/ads";
import { delivery } from "./schemas/delivery";
import { sellersProduct } from "./schemas/sellers-product";

export const schema = {
  types: [product, siteInfo, delivery, ads, sellersProduct, heroBanner, orders],
}

