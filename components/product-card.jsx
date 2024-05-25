const ProductCard = ({ category, products }) => {
  const matchedProduct = products.find((item) =>
    item?.categories?.includes(category)
  );

  // Check if matchedProduct is undefined before using it
  if (!matchedProduct) {
    return null; // or display a placeholder
  }

  if (!matchedProduct || !matchedProduct.images || matchedProduct.images.length === 0) {
    // Handle the case where there's no product, no images property, or an empty images array
    return null; // or display a placeholder image
  }

  const newCategory = encodeURIComponent(category);
  const imageSrc = urlForImage(matchedProduct.images[0]).url();

  return (
    <Suspense fallback={<div className="sm:w=[150px] md:w-[158px] lg:w-[200px] rounded-md  bg-gray-400 animate-pulse"></div>}>
      {/* <div className="" > */}
        <Link href={`/categories/${newCategory}`} className="w-3/4 flex-col flex items-center justify-center hover:opacity-50 h-[160px]">
          <div className=" w-full  mx-auto overflow-hidden rounded-md bg-gray-100 flex items-center">
          <Img
            src={imageSrc}
            width={200}
            height={200}
            alt={matchedProduct.name}
            className='object-cover h-[140px]'
          />
          </div>
{" "}
          <p className="text-center mt-2 capitalize">{category}</p>
        </Link>
      {/* </div> */}
    </Suspense>
  );
};

export default ProductCard;
