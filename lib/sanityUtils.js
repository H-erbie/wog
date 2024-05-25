const { client } = require("@/sanity/lib/client")
const { groq } = require("next-sanity")







export const sanitySchemes = {
    heros: async()=>{
         await client.fetch(groq`*[_type == "heroBanner"]{
            images,
            detail,
            _id
          }`,{next: {revalidate: 30}})
    },
    products: async()=>{
         await client.fetch(groq`*[_type == "product"]` ,{next: {revalidate: 30}})
    }
  }