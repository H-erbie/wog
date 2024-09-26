import { defineField, defineType } from "sanity";

export const about = defineType ({
    name: "about",
    title: "About",
    type: "document",
    fields: [
        {
            name: 'historyImg',
            title: 'History Image',
            type:'image'
        },
        {
            name: 'missionImg',
            title: 'History Image',
            type:'image'
        },
        {
            name: 'historyText',
            title: 'History Text',
            type: 'string',
        },
        {
            name: 'missionText',
            title: 'Mission Text',
            type: 'string',
        },
       
    ]
})