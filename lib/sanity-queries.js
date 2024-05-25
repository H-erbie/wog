import { groq } from "next-sanity";

// export const adminOrders =     groq`*[_type == "orders" && _id == "${order}"]`

export const heroQuery = groq`*[_type == "heroBanner"]{
    images,
    detail,
    _id
  }`;

  