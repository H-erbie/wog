import { defineField, defineType } from "sanity";

export const home = defineType ({
    name: "home",
    title: "Home",
    type: "document",
    fields: [
        {
            name: 'bannerSmall',
            title: 'Banner Small Image',
            type:'image'
        },
        {
            name: 'bannerBig',
            title: 'Banner Big Image',
            type: 'image',
        },
        {
            name: 'statusBg',
            title: 'Status Background',
            type: 'image',
        },
        {
            name: 'firstIntro',
            title: 'First Banner Text',
            type: 'string',
        },
        {
            name: 'secondIntro',
            title: 'Second Banner Text',
            type: 'string',
        },
        {
            name: 'donateText',
            title: 'Donation Text',
            type: 'string',
        },
        {
            name: 'aim',
            title: 'Aim Text',
            type: 'string',
        },
        {
            name: 'aimImg',
            title: 'Aim Text',
            type: 'string',
        },
       
    ]
})