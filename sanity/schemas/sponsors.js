import { defineField, defineType } from "sanity";

export const sponsors = defineType ({
    name: "sponsors",
    title: "Sponsors",
    type: "document",
    fields: [
        {
            name: 'sponsorImg',
            title: 'Sponsor Image',
            type:'image'
        },
      

       
    ]
})