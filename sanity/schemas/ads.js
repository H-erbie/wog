import { defineField, defineType } from "sanity";

export const ads = defineType ({
    name: "ads",
    title: "Ads",
    type: "document",
    fields: [
        {
            name: 'name',
            title: 'Product Name',
            type:'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'url',
            title: 'Video Url',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Ad Description',
            type: 'string',
        },
       
    ]
})