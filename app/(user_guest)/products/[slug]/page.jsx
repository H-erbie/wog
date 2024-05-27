import Cardcategories from '@/components/card-categories'
import MiniNav from '@/components/mini-nav'
import ProductGallery from '@/components/product-gallery'
import ProductInfo from '@/components/product-info'
// import VerifyDialog from '@/components/verify-dialog'
import YouMayAlsoLike from '@/components/you-may-also-like'
import { client, sanityFetch } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import React from 'react'

const Page = async({params}) => {

  
  const product = await sanityFetch({
    query: groq`*[_type == "product" && slug.current == "${params.slug}"][0]`,
    tags:["product"]
  })
  const products = await sanityFetch({
    query: groq`*[_type == "product"]`,
    tags:["product"]
  })
  const orders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags:["orders"]
  })


  const miniLinks = [
    { text: "home", link: "/" },
    // { text: "categories", link: "/categories" },
    // { text: product.categories[0], link: `/categories/${product.categories[0].toLowerCase()}` },
    { text: product?.name, link: "" },
  ]
  // console.log(product)
  

  return (
    <div className='main pt-24'>
            {/* <VerifyDialog/> */}

            <MiniNav links={miniLinks} />
            <div className="mx-auto w-full ">
        {/* Product */}
        <div className="pb-20 lg:flex lg:w-full lg:gap-x-12">
          {/* Product gallery */}
          <section className='lg:w-1/2 w-full mx-auto'><ProductGallery product={product}/></section>
          {/* Product info */}
          <section className='lg:w-1/2 sm:w-3/4 w-full mx-auto'><ProductInfo product={product} orders={orders}/></section>
          {/* you may also like */}
          
        </div>
        
      </div>  
          <YouMayAlsoLike products={products} category={product?.categories?.[0].toLowerCase()} productId={product?._id}/>
 </div>
  )
}

export default Page