import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const MiniNav = ({ links }) => {
  return (
    <div className="mb-3">
      {links.map((lnk, index) => {
        const currentLink = links.length - 1 === index;
        if(currentLink) return <>\<span key={index}  className="ml-2 capitalize font-semibold text-base text-yellow-500">{lnk.text}</span></>
        return (
          <>
            {index !== 0 && <>\</>}
            <Link
              href={lnk.link}
              key={index}
            >
              <Button variant='link' className='capitalize font-semibold text-base'>
              {lnk.text}
              </Button>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default MiniNav;
