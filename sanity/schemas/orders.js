import { defineField, defineType } from "sanity";

export const orders = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Order Id",
      type: "string",
    }),
    {
      name: 'purchaser',
      title: 'Purchaser Info',
      type: 'object',
      fields: [
        {
          name: 'id',
          type: 'string',
          title: 'Purhcaser Id',
        },
        {
          name: 'name',
          type: 'string',
          title: 'Purhcaser Name',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Purhcaser Contact',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Purhcaser Email',
        },
      ]
    },
    {
      name: "orderProducts",
      type: "array",
      title: "Order Products",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Product Name",
            },
            {
              name: "image",
              title: "Product Image",
              type: "image",
            },
            {
              name: "price",
              title: "Product Price",
              type: "number",
            },
            {
                name: "quantity",
                title: "Product Quantity",
                type: "number",
              },
          ],
        },
      ],
    },
    {
      name: "shippingAddress",
      type: "string",
      title: "Shipping Address",
    },
    {
      name: "total",
      type: "number",
      title: "Total",
    },
    {
        name: "isConfirmed",
        type: "boolean",
        title: "Order is Confirmed",
        initialValue: true,
      },
    {
        name: "isProcessing",
        type: "boolean",
        title: "Order is Processing",
        initialValue: false,
      },
      {
        name: "isShipped",
        type: "boolean",
        title: "Order is Shipped",
        initialValue: false,
      },
      {
        name: "isDelivered",
        type: "boolean",
        title: "Order is Delivered",
        initialValue: false,
      },
      
      {
        name: "isCancelled",
        type: "boolean",
        title: "Order is Cancelled",
        initialValue: false,
      },
       {
      name: "currentStat",
      type: "string",
      title: "Current Status",
    },
    {
      name: "driverName",
      type: "string",
      title: "Driver's name",
    },
    {
      name: "driverPhone",
      type: "string",
      title: "Driver's contact",
    },
  ],
});
