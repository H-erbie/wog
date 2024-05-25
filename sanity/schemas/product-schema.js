import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "homepageCategories",
      title: "Home Categories",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "sku",
      title: "SKU",
      type: "slug",
      options: {
        source: "_id",
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "netRates",
      title: "Total Number of Rates",
      type: "number",
      initialValue: 0
      // readOnly: true,
    },
    {
      name: "Stars1",
      title: "Number of 1 Stars",
      type: "number",
      initialValue: 0,

      // readOnly: true,
    },
    {
      name: "Stars2",
      title: "Number of 2 Stars",
      type: "number",
      initialValue: 0,

      // readOnly: true,
    },

    {
      name: "Stars3",
      title: "Number of 3 Stars",
      type: "number",
      initialValue: 0,

      // readOnly: true,
    },
    {
      name: "Stars4",
      title: "Number of 4 Stars",
      type: "number",
      initialValue: 0,

      // readOnly: true,
    },
    {
      name: "Stars5",
      title: "Number of 5 Stars",
      type: "number",
      initialValue: 0,
      // readOnly: true,
    },
    {
      name: "ratesReviews",
      type: "array",
      title: "Rates and Reviews from Verified Purchases",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "firstName",
              type: "string",
              title: "User First Name",
            },
            {
              name: "subject",
              type: "string",
              title: "Review Subject",
            },
            {
              name: "review",
              type: "string",
              title: "User Review",
            },
            {
              name: "rate",
              type: "number",
              title: "Rate",
              initialValue: 0,
            },
            {
              name: "date",
              type: "date",
              title: "Date",
            },
            {name: "userId",
             type: "string",
             title: "User Id"
        },
          ],
        },
      ],
    },
  ],
});
