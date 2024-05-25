import { defineField, defineType } from "sanity";

export const sellersProduct = defineType ({
    name: "sellersProduct",
    title: "Sellers Products",
    type: "document",
    fields: [
        {
            name: 'name',
            title: 'Product Name',
            type:'string'
        },
        {
            name: 'image',
            title: 'Product Image',
            type: 'image',
        },
        {
            name: 'price',
            title: 'Product Price',
            type: 'number',
        },
        {
            name: 'desc',
            title: 'Product Description',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Product Category',
            type: 'string',
        },
 {
            name: 'homepageCategory',
            title: 'Homepage Category',
            type: 'string',
        },
        {
            name: 'currentStat',
            title: 'Current Status',
            type: 'string',
        },
    ]
})