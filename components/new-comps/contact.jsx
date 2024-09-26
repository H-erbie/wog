import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <>
    
    <div className="p-5  flex justify-center items-center gap-9  flex-col">
         <h3 className="sm:text-3xl   text-center  lg:text-left text-2xl mb-9  mx-auto lg:mx-0 w-52 font-bold">
        Get in <span className="text-[#F53D3D]">touch</span>{" "}
      </h3>

      {/* <div className="w-3/4 h-40 bg-red-400 lg:w-1/2">Map</div> */}
      <div className="sm:w-3/4 mx-auto w-[85%]  lg:w-1/2 flex flex-col gap-y-6">

        <input
          type="text"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter name"
          name="name"
        />
        <input
          type="email"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter email"
          name="email"
        />
        <input
          type="text"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter subject"
          name="subject"
        />
        <textarea
          placeholder="Enter message"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
        ></textarea>
                <button className='mx-auto w-3/4 rounded-xl hover:scale-[1.1] transition-all px-3 bg-[#F53D3D] text-white font-bold py-2'>Send message</button>

      </div>
    </div></>
  );
};

export default Contact;
