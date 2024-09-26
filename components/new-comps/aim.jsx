import Link from "next/link";
import React from "react";
import Image from "next/image";
import aim from '@/public/aim.jpg'
import { Reveal } from "./reveal";

const Aim = () => {
 

  return (
    <div className="h-max pt-40 pb-6 relative px-8">
      <svg xmlns="http://www.w3.org/2000/svg" className='absolute rotate-180 left-0 top-0  lg:-top-10'  viewBox="0 0 1440 320"><path className='absolute -top-20' fill="#FFF" fillOpacity="1" d="M0,32L18.5,74.7C36.9,117,74,203,111,197.3C147.7,192,185,96,222,90.7C258.5,85,295,171,332,181.3C369.2,192,406,128,443,90.7C480,53,517,43,554,85.3C590.8,128,628,224,665,229.3C701.5,235,738,149,775,138.7C812.3,128,849,192,886,229.3C923.1,267,960,277,997,261.3C1033.8,245,1071,203,1108,197.3C1144.6,192,1182,224,1218,208C1255.4,192,1292,128,1329,96C1366.2,64,1403,64,1422,64L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
   <h3 className="sm:text-4xl del text-center lg:text-left text-3xl mb-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">Why we do <span className="text-[#F53D3D] del">What we do</span> </h3>
    <div className='flex flex-col-reverse items-center lg:flex-row gap-y-6 lg:gap-x-12'>
      
      <p className='w-full lg:w-1/2 px-6 '>o fuga seione eos pariatur veniam minima? Veniam eaque doloribus quae, ducimus in perspiciatis illo temporibus totam ad corporis officiis? Eveniet repellat natus totam praesentium sunt vitae, similique hic officia placeat quas. Commodi, corporis sequi perspiciatis eligendi sunt vitae assumenda quidem veritatis praesentium, pariatur illum temporibus nisi consectetur dignissimos similique. Assumenda quisquam laboriosam incidunt beatae dignissimos inventore, expedita nisi eum. Nihil minus enim incidunt sint!</p>
      <Image
                    src={
                      // urlForImage(siteInfo?.images)
                      aim
                    }
                    sizes='responsive'
                    width={300}
                    height={200}
                    alt="stat section background image"
                    className="sm:w-3/4 w-[85%]  bg-red-200 lg:w-1/2  lg:mx-0 rounded-3xl mx-auto object-cover"
                  />

    </div>
    </div>
  );
};

export default Aim;
