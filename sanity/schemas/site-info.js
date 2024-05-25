import { defineField, defineType } from "sanity";

export const siteInfo = defineType ({
    name: "siteInfo",
    title: "Site Info",
    type: "document",
    fields: [
        defineField({
            name: 'name',
            title: 'Site Name',
            type: 'string',
        }),

        {
            name: 'images',
            title: 'Site Logo',
            type:'image'
        },
        {
            name: 'description',
            title: 'Site Description',
            type: 'string',
        },
        {
            name: 'gmail',
            title: 'Gmail Link',
            type: 'string',
        },
        {
            name: 'instagram',
            title: 'Instagram Link',
            type: 'string',
        },{
            name: 'facebook',
            title: 'Facebook Link',
            type: 'string',
        },{
            name: 'twitter',
            title: 'Twitter Link',
            type: 'string',
        },
       
    ]
})