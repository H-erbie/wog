import React from "react";
import { Clock, X } from "lucide-react";
import { usePathname } from "next/navigation";


const Overlay = ({
  left,
  rightTop,
  rightMid1,
  rightMid2,
  rightBottom,
  setOverlay,
  overlay
}) => {
    const hideOverlay = () => {
        setOverlay(false)
    }
    const pathname = usePathname()

  return (
    <>
      
      <div className={` z-[60] w-full h-full flex-col lg:flex-row justify-center items-center gap-x-9 flex mx-auto`}>
        <div className={`${pathname.startsWith("/gallery") ? 'w-full': 'lg:w-1/2 w-[90%]'} rounded-2xl`}>{left}</div>
        <div className={`${pathname.startsWith("/gallery") ? 'hidden': 'flex'} w-[95%] lg:w-1/2 flex-col gap-y-3`}>
          <p className="text-xl lg:mt-16 font-bold text-center">{rightTop}</p>
          <div className="flex justify-evenly">
            <div className="flex items-center gap-x-3">
              <Clock className="w-4 text-gray-400 h-4" /> {rightMid1}
            </div>
            <div className="items-center flex gap-x-3">
              <Clock className="w-4 text-gray-400 h-4" />
              {rightMid2}
            </div>
          </div>
          <p className="leading-8">{rightBottom}</p>
        </div>
      </div>
    </>
  );
};

export default Overlay;
