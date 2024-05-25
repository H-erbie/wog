import { defineField, defineType } from "sanity";

export const heroBanner = defineType ({
    name: "heroBanner",
    title: "Hero Banner",
    type: "document",
    fields: [
        {
            name: 'images',
            title: 'Hero Image',
            type:'image'
        },
        {
            name: 'detail',
            title: 'Hero Detail',
            type: 'string',
        },

       
    ]
})