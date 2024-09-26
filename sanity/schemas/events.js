import { defineField, defineType } from "sanity";

export const events = defineType ({
    name: "events",
    title: "Events",
    type: "document",
    fields: [
        {
            name: 'eventImg',
            title: 'Event Image',
            type:'image'
        },
      
        {
            name: 'eventName',
            title: 'Event Name',
            type: 'string',
        },
        {
            name: 'date',
            title: 'Event Date',
            type: 'date',
        },
        {
            name: 'time',
            title: 'Event Time',
            type: 'string',
        },
        {
            name: 'meridian',
            title: 'Meridian',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Event Description',
            type: 'string',
        },
       
    ]
})