import Link from "next/link";
import React from "react";
import { Reveal } from "./reveal";

const Sponsors = () => {
 

  return (
    <div id='partners' className="bg-black pb-8 pt-60">

      <h3 className="sm:text-4xl  del text-center lg:text-left text-3xl mb-12 lg:ml-20 mx-auto text-white font-bold">Partners & <span className="text-[#F53D3D] del ">Sponsors</span> </h3>
       <div className='flex w-full sm:w-3/4 mx-auto flex-wrap gap-9 justify-center items-center'>
           {
               [1,2,3,4,5,6,7,8].map((sponsor, index)=>(
                   <div className='w-32 h-32 bg-white rounded-xl' key={index}></div>
               ))
           }
       </div>
       <svg xmlns="http://www.w3.org/2000/svg" className='absolute rotate-180 -top-1 left-0'  viewBox="0 0 1440 320"><path className='absolute top-0' fill="#F4EBEB" fillOpacity="1" d="M0,32L18.5,74.7C36.9,117,74,203,111,197.3C147.7,192,185,96,222,90.7C258.5,85,295,171,332,181.3C369.2,192,406,128,443,90.7C480,53,517,43,554,85.3C590.8,128,628,224,665,229.3C701.5,235,738,149,775,138.7C812.3,128,849,192,886,229.3C923.1,267,960,277,997,261.3C1033.8,245,1071,203,1108,197.3C1144.6,192,1182,224,1218,208C1255.4,192,1292,128,1329,96C1366.2,64,1403,64,1422,64L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>

    </div>
  );
};

export default Sponsors;
