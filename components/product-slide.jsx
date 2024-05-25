import React, {Suspense}  from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from './product-card';
const ProductSlide = ({category, products}) => {
  const matchedProducts = products.filter(product => product.homepageCategories.includes(category))

  return (
    <div>
                  <h2 className=' mb-4 ml-4 font-bold text-2xl capitalize'>{category}</h2>

    <div className="container h-max border  rounded-lg py-6 px-0">
    <Swiper
    navigation
    slidesPerView={2}
    
    breakpoints={
      {
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }
    }
    spaceBetween={1}
    modules={[Navigation]}
    className="h-full w-full rounded-lg"
  >
 {
    matchedProducts.map(product => {
        return <Suspense fallback={    
        <div className='h-24 w-24 bg-gray-400 animate-pulse rounded-lg'></div>
    }
    key={product._id}> 
        <SwiperSlide
            className="flex  justify-center items-center "
            style={{ width: "225px", height: 'max-content' }}
          >
         <ProductCard product={product}/> 
        </SwiperSlide>
    </Suspense>
})
}
</Swiper></div>
</div>
  )
}

export default ProductSlide