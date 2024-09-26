import Link from "next/link";
import React from "react";
import Image from "next/image";

import aim from '@/public/aim.jpg'
import abt from '@/public/abt.jpg'

const About = () => {
 

  return (
    <div className="p-5">
               <h3 className="sm:text-4xl del text-center lg:text-left text-3xl mb-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">Hi<span className="text-[#F53D3D] del">story</span> </h3>
 <div className='flex items-center lg:flex-row gap-8 flex-col-reverse'>
      <p className='leading-6 w-[85%] sm:w-3/4 lg:w-1/2 mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia tenetur fugit, quasi ipsum quam adipisci perferendis quis praesentium, dicta eaque maiores? Vitae, laudantium qui. Iure amet quo incidunt quos perferendis similique assumenda debitis sunt expedita molestias eligendi voluptate nihil, sint deserunt nobis libero tempore doloremque, dolorem veniam praesentium. Officia et expedita perspiciatis quasi, laboriosam quaerat numquam reiciendis optio quas doloribus natus vitae dolore qui quisquam, unde libero inventore? Voluptates dolorem molestiae, ad aut voluptatem soluta ut. Perspiciatis dolor velit, assumenda qui, pariatur deserunt cumque consequatur nesciunt architecto asperiores corrupti, debitis voluptate ratione quasi porro a alias officia expedita excepturi voluptas.</p>  
      <Image
                    src={
                      // urlForImage(siteInfo?.images)
                      aim
                    }
                    sizes='responsive'

                    width={180}
                    height={150}
                    alt="stat section background image"
                    className="sm:w-3/4 w-[85%] lg:w-1/2 bg-red-200  lg:mx-0 rounded-3xl mx-auto object-cover"
                  />
        </div>
        <h3 className="sm:text-4xl del text-center lg:text-left text-3xl my-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">Miss<span className="text-[#F53D3D] del">ion</span> </h3>

        <div className='flex items-center gap-8 lg:flex-row-reverse flex-col-reverse'>
      <p className='leading-6 w-[85%] sm:w-3/4 lg:w-1/2 mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia tenetur fugit, quasi ipsum quam adipisci perferendis quis praesentium, dicta eaque maiores? Vitae, laudantium qui. Iure amet quo incidunt quos perferendis similique assumenda debitis sunt expedita molestias eligendi voluptate nihil, sint deserunt nobis libero tempore doloremque, dolorem veniam praesentium. Officia et expedita perspiciatis quasi, laboriosam quaerat numquam reiciendis optio quas doloribus natus vitae dolore qui quisquam, unde libero inventore? Voluptates dolorem molestiae, ad aut voluptatem soluta ut. Perspiciatis dolor velit, assumenda qui, pariatur deserunt cumque consequatur nesciunt architecto asperiores corrupti, debitis voluptate ratione quasi porro a alias officia expedita excepturi voluptas.</p>  
      <Image
                    src={
                      // urlForImage(siteInfo?.images)
                      abt
                    }
                    sizes='responsive'

                    width={180}
                    height={150}
                    alt="stat section background image"
                    className="sm:w-3/4 w-[85%] lg:w-1/2 bg-red-200  lg:mx-0 rounded-3xl mx-auto object-cover"
                  />
        </div>
        <h3 className="sm:text-4xl del text-center lg:text-left text-3xl my-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">Tea<span className="text-[#F53D3D] del">m</span> </h3>
        <div className='flex w-full sm:w-3/4 mx-auto flex-wrap gap-9 justify-center items-center'>
           {
               [1,2,3,4,5,6,7,8].map((sponsor, index)=>(
                   <div className='w-32 h-32 bg-white rounded-xl' key={index}></div>
               ))
           }
       </div>
    </div>
  );
};

export default About;
