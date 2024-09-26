import Link from "next/link";
import React from "react";
import statbg from "@/public/statbg1.jpg";
import Image from "next/image";
import { Reveal } from "./reveal";

const StatusSec = () => {
  return (
    <div className=" relative overflow-hidden h-screen gap-x-9">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,32L18.5,74.7C36.9,117,74,203,111,197.3C147.7,192,185,96,222,90.7C258.5,85,295,171,332,181.3C369.2,192,406,128,443,90.7C480,53,517,43,554,85.3C590.8,128,628,224,665,229.3C701.5,235,738,149,775,138.7C812.3,128,849,192,886,229.3C923.1,267,960,277,997,261.3C1033.8,245,1071,203,1108,197.3C1144.6,192,1182,224,1218,208C1255.4,192,1292,128,1329,96C1366.2,64,1403,64,1422,64L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-20 rotate-180 -top-1 lg:-top-10"
        viewBox="0 0 1440 320"
      >
        <path
          className="absolute top-0"
          fill="#F4EBEB"
          fillOpacity="1"
          d="M0,32L18.5,74.7C36.9,117,74,203,111,197.3C147.7,192,185,96,222,90.7C258.5,85,295,171,332,181.3C369.2,192,406,128,443,90.7C480,53,517,43,554,85.3C590.8,128,628,224,665,229.3C701.5,235,738,149,775,138.7C812.3,128,849,192,886,229.3C923.1,267,960,277,997,261.3C1033.8,245,1071,203,1108,197.3C1144.6,192,1182,224,1218,208C1255.4,192,1292,128,1329,96C1366.2,64,1403,64,1422,64L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
      </svg>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F4EBEB" fill-opacity="1" d="M0,192L20,208C40,224,80,256,120,229.3C160,203,200,117,240,96C280,75,320,117,360,122.7C400,128,440,96,480,112C520,128,560,192,600,213.3C640,235,680,213,720,176C760,139,800,85,840,69.3C880,53,920,75,960,96C1000,117,1040,139,1080,170.7C1120,203,1160,245,1200,234.7C1240,224,1280,160,1320,149.3C1360,139,1400,181,1420,202.7L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path></svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F4EBEB" fill-opacity="1" d="M0,224L16,240C32,256,64,288,96,261.3C128,235,160,149,192,112C224,75,256,85,288,112C320,139,352,181,384,170.7C416,160,448,96,480,106.7C512,117,544,203,576,208C608,213,640,139,672,133.3C704,128,736,192,768,197.3C800,203,832,149,864,138.7C896,128,928,160,960,181.3C992,203,1024,213,1056,202.7C1088,192,1120,160,1152,128C1184,96,1216,64,1248,69.3C1280,75,1312,117,1344,117.3C1376,117,1408,75,1424,53.3L1440,32L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"></path></svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F4EBEB" fill-opacity="1" d="M0,192L11.4,186.7C22.9,181,46,171,69,154.7C91.4,139,114,117,137,138.7C160,160,183,224,206,218.7C228.6,213,251,139,274,138.7C297.1,139,320,213,343,256C365.7,299,389,309,411,293.3C434.3,277,457,235,480,192C502.9,149,526,107,549,106.7C571.4,107,594,149,617,181.3C640,213,663,235,686,202.7C708.6,171,731,85,754,90.7C777.1,96,800,192,823,229.3C845.7,267,869,245,891,245.3C914.3,245,937,267,960,245.3C982.9,224,1006,160,1029,160C1051.4,160,1074,224,1097,224C1120,224,1143,160,1166,133.3C1188.6,107,1211,117,1234,138.7C1257.1,160,1280,192,1303,208C1325.7,224,1349,224,1371,213.3C1394.3,203,1417,181,1429,170.7L1440,160L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path></svg>
   */}

      <Image
        src={
          // urlForImage(siteInfo?.images)
          statbg
        }
        sizes="responsive"
        width={500}
        height={300}
        alt="stat section brightness-[0.5] background image"
        className="w-full bg-red-200  h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white from-2%" />
      <div className="flex absolute del mt-14 justify-center items-center h-full w-full top-0 left-0 flex-col gap-y-5 sm:gap-y-9">
          <p className="sm:text-[3rem] del text-4xl lg:text-[4rem] text-white font-bold">
            {" "}
            <span className="text-[#F53D3D] del">6 years</span> of operation
          </p>
          <p className="sm:text-[3rem] del text-4xl lg:text-[4rem] text-white font-bold">
            {" "}
            <span className="text-[#F53D3D] del">6 years</span> of operation
          </p>
          <p className="sm:text-[3rem] del text-4xl lg:text-[4rem] text-white font-bold">
            {" "}
            <span className="text-[#F53D3D] del">6 years</span> of operation
          </p>
          <p className="sm:text-[3rem] text-4xl del lg:text-[4rem] text-white font-bold">
            {" "}
            <span className="text-[#F53D3D] del">6 years</span> of operation
          </p>
      </div>
    </div>
  );
};

export default StatusSec;
