import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const  lowerCase = (products) => {
    // Create a new array to store the lowercase categories.

  const lowercasedProducts = [];

  // Iterate over the products array and convert each category to lowercase.
  for (const product of products) {
    const lowercasedCategories = product.categories.map((category) =>
      category.toLowerCase()
    );
    product.categories = lowercasedCategories;
    lowercasedProducts.push(product);
  }
  return lowercasedProducts

}


export const  lowerCaseHome = (products) => {
  // Create a new array to store the lowercase categories.

const lowercasedProducts = [];

// Iterate over the products array and convert each category to lowercase.
for (const product of products) {
  const lowercasedCategories = product.homepageCategories.map((category) =>
    category.toLowerCase()
  );
  product.homepageCategories = lowercasedCategories;
  lowercasedProducts.push(product);
}
return lowercasedProducts

}


//make all categories lowercase
export function makeCategoriesLowercase(products) {
 let lowercasedProducts = lowerCase(products)
  const uniqueCategories = [
    ...new Set(lowercasedProducts.flatMap((item) => item.categories)),
  ];
  // Return the new array of lowercase categories.
  return uniqueCategories;
}



//make all homepage categories lowercase
export function makeHomeCategoriesLowercase(products) {
  let lowercasedProducts = lowerCaseHome(products)
   const uniqueCategories = [
     ...new Set(lowercasedProducts.flatMap((item) => item.homepageCategories)),
   ];
   // Return the new array of lowercase categories.
   return uniqueCategories;
 }


// export function getSizeName(value: string) {
//   switch (value) {
//     case "xs":
//       return "X-Small"
//     case "s":
//       return "Small"
//     case "m":
//       return "Medium"
//     case "l":
//       return "Large"
//     case "xl":
//       return "X-Large"
//     case "one-size":
//       return "One Size"
//   }
// }

