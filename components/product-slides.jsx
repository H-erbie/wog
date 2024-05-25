'use client'
import React from 'react'
import ProductSlide from './product-slide';
import { makeHomeCategoriesLowercase } from '@/lib/utils';

const ProductSlides =  ({products}) => {
  function prioritizeArrivals(categories) {
    const arrivalsIndex = categories.indexOf("new arrivals");
  
    if (arrivalsIndex >= 0 && arrivalsIndex !== 0) {
      const arrivals = categories[arrivalsIndex];
      categories.splice(arrivalsIndex, 1);
      categories.unshift(arrivals);
    }
  
    return categories;
  }
  const categories = makeHomeCategoriesLowercase(products)
  const newCategories = prioritizeArrivals(categories)
  
  return (
    <div className='flex flex-col gap-y-16'>
        {
            newCategories.map(category => {
              
              return <>
                <ProductSlide category={category} products={products}/>
                </>})
        }
    </div>
  )
}

export default ProductSlides