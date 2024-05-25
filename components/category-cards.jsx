'use client'
import React, {Suspense} from 'react'
import CategoryCard from './category-card';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';

const CategoryCards = ({products, newCategories}) => {
   
  return (
    <div className="container h-48   rounded-lg py-2 px-0">
        <Swiper
        navigation
        slidesPerView={2}
        
        breakpoints={
          {
            450:{
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            800: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }
        }
        spaceBetween={1}
        modules={[Navigation]}
        className="h-full w-full rounded-lg"
      >
    {
        newCategories.map(category => {
          const newProduct = products.find(product=> product.categories.includes(category))

            return <Suspense fallback={    
            <div className='h-24 w-24 bg-gray-400 dark:bg-zinc-600  animate-pulse rounded-lg'></div>
        }
        key={newProduct._id}>
            <SwiperSlide
                className="flex  justify-center items-center "
                style={{ width: "120px", height: '150px' }}
              >
                <Link href={`/categories/${category}`}>
            <CategoryCard category={category} product={newProduct}/></Link>
            </SwiperSlide>
         </Suspense>
})
       
    }
    </Swiper></div>
  )
}

export default CategoryCards