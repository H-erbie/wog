import React from 'react'
// import { ImSad } from "react-icons/im";
import { ImFileEmpty } from "react-icons/im";
const NoOrders = ({text}) => {
  
  return (
    <div className='flex justify-center items-center min-h-[60vh] w-full flex-col gap-y-3'>
      <ImFileEmpty className='w-20 h-20 animate-pulse dark:text-gray-200 text-gray-400'/>
      <p className='sm:text-3xl text-center text-xl animate-pulse font-semibold'>{text}</p>
    </div>
  )
}

export default NoOrders