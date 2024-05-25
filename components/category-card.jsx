import React from "react";
import Img from "./image";
import { urlForImage } from "@/sanity/lib/image";

const CategoryCard = ({ category, product }) => {
  return (
    <div className="  my-3 py-2 px-0 flex flex-col gap-2">
      <div className="overflow-hidden rounded-md w-32 h-32 mx-auto">
        {" "}
        <Img
          src={urlForImage(product.images[0]).url()}
          alt={product.name}
          width={128}
          height={128}
          className={'hover:scale-125 dark:bg-zinc-600 transition-all'}
        />
      </div>
      <span className="text-center w-full capitalize">{category}</span>
    </div>
  );
};

export default CategoryCard;
