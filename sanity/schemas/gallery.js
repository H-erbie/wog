import { defineField, defineType } from "sanity";

export const gallery = defineType ({
    name: "gallery",
    title: "Gallery",
    type: "document",
    fields: [
        {
            name: 'galleryImg',
            title: 'Gallery Image',
            type:'image'
        },
      

       
    ]
})