import React from 'react'
import Cardcategories from './card-categories'
import { makeHomeCategoriesLowercase } from '@/lib/utils';

const CategorySlide = ({products}) => {
 
  const categories = makeHomeCategoriesLowercase(products);

  function prioritizeArrivals(categories) {
    const arrivalsIndex = categories.indexOf("new items");
  
    if (arrivalsIndex >= 0 && arrivalsIndex !== 0) {
      const arrivals = categories[arrivalsIndex];
      categories.splice(arrivalsIndex, 1);
      categories.unshift(arrivals);
    }
  
    return categories;
  }
  const newCategories = prioritizeArrivals(categories)
   return (
    <>
    {newCategories.map((category, index) => (
    <>
    <div className="flex justify-between w-full px-4" key={index}>
    <span className='products-slide-title'>{category}</span>
    <a href={`/gp/${category}`} className='hover:underline dark:text-yellow-400 text-yellow-500'>see more</a>
    </div>
    <Cardcategories products={products} category={category}/>
    </>
    ))}
 
    </>
  )
}

export default CategorySlide