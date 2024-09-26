import { defineField, defineType } from "sanity";

export const team = defineType ({
    name: "team",
    title: "Team",
    type: "document",
    fields: [
        {
            name: 'teamImg',
            title: 'Team Image',
            type:'image'
        },
        {
            name: 'position',
            title: 'Member Position',
            type: 'string',
        },
        {
            name: 'name',
            title: 'Member Name',
            type: 'string',
        },

       
    ]
})