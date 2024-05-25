import { defineField, defineType } from "sanity";

export const heroImages = defineType ({
    name: "heroImages",
    title: "Hero Images",
    type: "document",
    fields: [
        {
            name: 'images',
            title: 'Hero Image',
            type:'image'
        },
        {
            name: 'detail',
            title: 'Image Detail',
            type: 'string',
        },

       
    ]
})