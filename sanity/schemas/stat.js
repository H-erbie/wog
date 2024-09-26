import { defineField, defineType } from "sanity";

export const stat = defineType ({
    name: "stat",
    title: "Stat",
    type: "document",
    fields: [
       
        {
            name: 'fig',
            title: 'Stat Figure',
            type: 'number',
        },
        {
            name: 'value',
            title: 'Stat Value',
            type: 'string',
        },

       
    ]
})