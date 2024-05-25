import { defineField, defineType } from "sanity";

export const delivery = defineType ({
    name: "delivery",
    title: "Delivery",
    type: "document",
    fields: [
        {
            name: 'name',
            title: 'Delivery/Order Name',
            type:'string'
        },
        {
            name: 'driver',
            title: 'Driver Info',
            type: 'object',
            fields: [
              {
                name: 'id',
                type: 'string',
                title: 'driver Id',
              },
              {
                name: 'name',
                type: 'string',
                title: 'Driver Name',
              },
              {
                name: 'phone',
                type: 'string',
                title: 'Driver\'s Contact',
              },
              {
                name: 'email',
                type: 'string',
                title: 'Driver\'s Email',
              },
            ]
          },
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
            name: 'isStarted',
            title: 'Has Started',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'isDelivered',
            title: 'Has Delivered',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'isCancelled',
            title: 'Has been Cancelled',
            type: 'boolean',
            initialValue: false,
        },
    ]
})