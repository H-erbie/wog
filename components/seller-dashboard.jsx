"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Briefcase, Pencil, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/sanity/lib/slugify"; // Assuming slugify function is in a separate file
import NoOrders from "./no-orders";
import Image from "next/image";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { urlForImage } from "@/sanity/lib/image";
import { auth, db } from "@/firebase/config";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectLabel,
//   SelectGroup,
//   SelectValue,
// } from "@/components/ui/select";
import { useAuthState } from "react-firebase-hooks/auth";

const SellerDashboard = ({ products, orders }) => {
  const [user] = useAuthState(auth);
  const isSeller = JSON.parse(sessionStorage.getItem("andamo-seller"));
  const [uks, setUks] = useState("");
  useEffect(() => {
    const slugifySku = async () => setUks(await slugify(isSeller?.name));
    slugifySku();
  }, []);

  const filteredProducts = products.filter(
    (product) => product?.sku?.current === uks.current
  );

  let totalProfit = 0;
  orders.forEach((order) => {
    if (!order.isDelivered) {
      // Early exit for non-delivered orders
      return;
    }

    const orderProductsMap = new Map(); // Map for efficient lookup
    order.orderProducts.forEach((orderProduct) => {
      orderProductsMap.set(orderProduct.name, orderProduct.price); // Store price
    });

    filteredProducts.forEach((newProduct) => {
      if (orderProductsMap.has(newProduct.name)) {
        // Efficient price lookup
        totalProfit += orderProductsMap.get(newProduct.name); // Retrieve price
      }
    });
  });
  const [business, setBusiness] = useState({
    businessName: "",
    location: "",
    sellerName: isSeller?.sellerName,
    sellerContact: isSeller?.sellerContact,
    paymentMethod: "",
  });
  const { businessName, location, sellerContact, paymentMethod, sellerName } =
    business;

  const handleSeller = ({ target }) => {
    const { name, value } = target;
    setBusiness({ ...business, [name]: value });
  };

  const [updateLoading, setUpdateLoading] = useState(false);
  const updateSeller = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const currentCategory = e.target[5].value;

    try {
      await updateDoc(doc(db, "sellers", user.uid), {
        name: businessName,
        location,
        sellerContact,
        paymentMethod,
        sellerName,
        category: currentCategory,
      });

      // Update local state and UI
      setUpdateLoading(false);
      setBusiness({
        ...business,
        businessName: "",
        location: "",
        sellerName: isUserDataStored?.displayName,
        sellerContact: isUserDataStored?.phoneNumber,
        paymentMethod: "",
      });
      setCategory("");

      // Show success message or redirect to seller dashboard
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
    }
  };
  // const [prods, setProds] = useState(filteredProducts);
  const [ind, setInd] = useState(0);
  // console.log(totalProfit);
  const [delProdLoading, setDelProdLoading] = useState(false);
  const deleteProduct = async (_id, index) => {
    setDelProdLoading(true);
    setInd(index);
    try {
      const response = await fetch("/api/del-product", {
        method: "POST",
        body: JSON.stringify({
          _id,
        }),
      });
      if (response) {
        toast({
          title: `Deleted product!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        setDelProdLoading(false);
      } else {
        toast({
          title: `Failed to delete product!`,
          variant: "destructive",
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        setDelProdLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to delete product!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      setDelProdLoading(false);
    }
  };

  const [edit, setEdit] = useState(false);

  const { toast } = useToast();
  const categories = [
    { name: "Fashion and Apparel", value: "Fashion and Apparel" },
    { name: "Beauty and Personal Care", value: "Beauty and Personal Care" },
    { name: "Home and Garden", value: "Home and Garden" },
    { name: "Electronics and Computers", value: "Electronics and Computers" },

    { name: "Groceries and Food", value: "Groceries and Food" },
    { name: "Health and Wellness", value: "Health and Wellness" },
    { name: "Toys and Games", value: "Toys and Games" },
    { name: "Pet Supplies", value: "Pet Supplies" },
    { name: "Sports and Outdoors", value: "Sports and Outdoors" },
    { name: "Arts and Crafts", value: "Arts and Crafts" },
    { name: "Books and Media", value: "Books and Media" },
    {
      name: "Stationery and Office Supplies",
      value: "Stationery and Office Supplies",
    },
    { name: "Luxury Goods", value: "Luxury Goods" },
  ];

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    homepageCategories: "",
    description: "",
  });
  const { name, price, homepageCategories, description } = productData;
  const [imageFile, setImageFile] = useState(""); // State for the uploaded image file
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    const { name, value, files } = event.target;

    if (name === "imgs") {
      // if (files && files[0]) {
      // const reader = new FileReader();
      // reader.onload = (e) => {
      setImageFile(files[0]); // Set the image preview URL
      // };
      // reader.readAsDataURL(files[0]);
      // } else {
      //   setImageFile(null); // Clear preview if no file selected
      // }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };
  const sellerInfo = JSON.parse(sessionStorage.getItem("andamo-seller"));

  const uploadProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const currentCategory = e.target[3].value;

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.set("imgs", imageFile);
    formData.set("sku", sellerInfo?.name);
    formData.append("price", Number(productData.price).toFixed(2));
    formData.append("description", productData.description);
    formData.append("categories", currentCategory); // Optional

    try {
      const response = await fetch("/api/seller-products", {
        method: "POST",
        body: formData,
      });

      // const data = await response.json();
      if (response) {
        toast({
          title: `Added new product!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        setProductData({
          ...productData,
          name: "",
          sku: "",
          price: 0,
          categories: "",
          homepageCategories: "",
          description: "",
        });
        setImageFile("");
        // Handle successful product creation (e.g., clear form, show success message)
      } else {
        toast({
          title: `Failed to add new product!`,
          variant: "destructive",
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        // Handle creation error (e.g., show error message to user)
      }
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to add new product!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pb-6">
      <h1 className="text-xl w-max my-3 font-bold flex items-center gap-x-2 mx-auto">
        Your Dashboard <Briefcase />
      </h1>
      <Tabs defaultValue="upload">
        <TabsList classname="lg:text-lg mx-auto mt-4 text-sm md:text-base">
          <TabsTrigger value="upload">Upload Product</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="stats">Business Stats</TabsTrigger>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          {imageFile && (
            <div className="w-full flex flex-wrap justify-center items-center gap-2">
              {/* // {imageFile.map((img, ind) => ( */}
              <img
                src={URL.createObjectURL(imageFile)}
                // key={ind}
                alt="Selected Image Preview"
                className="w-[20%] w-max-[150px] w-min-[80px]"
              />
              {/* // ))} */}
            </div>
          )}
          <form onSubmit={uploadProduct} className="flex flex-col gap-y-3">
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="imgs" className="mb-2">
                Product Image
              </label>
              <Input
                type="file"
                onChange={handleChange}
                accept="image/*"
                name="imgs"
                id="fileList"
                className=""
              />
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="name" className="mb-2">
                Name
              </label>{" "}
              <Input
                type="text"
                value={name}
                onChange={handleChange}
                required
                name="name"
                id="name"
                className=""
              />
            </div>
            {/* <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="sku">Product Source</label>
              <Input
                type="text"
                value={sku}
                onChange={handleChange}
                required
                name="sku"
                id="sku"
              />
            </div> */}
            <Select required className="w-[90%] gap-x-2 sm:w-3/4 mx-auto">
              <SelectTrigger className="w-[90%] gap-x-2 sm:w-3/4 mx-auto dark:border-zinc-600">
                <SelectValue placeholder="choose a category" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none bg-background  dark:bg-[#292e36] dark:border-zinc-600 border-black ">
                <SelectGroup className="grid grid-cols-2">
                  {categories.map((category) => (
                    <SelectItem
                      value={category.value}
                      key={category.name}
                      className="dark:hover:bg-[#191c22]"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="categories" className="mb-2">
                Categories
              </label>
              <Input
                type="text"
                value={categories}
                onChange={handleChange}
                required
                name="categories"
                id="categories"
                className=""
              />
            </div>{" "} */}
            {/* <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="homepageCategories" className="mb-2">
                Homepage Categories
              </label>
              <Input
                type="text"
                value={homepageCategories}
                onChange={handleChange}
                required
                name="homepageCategories"
                id="homeCateogories"
                className=""
              />
            </div>{" "} */}
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="description" className="mb-2">
                Description
              </label>
              <Input
                type="text"
                value={description}
                onChange={handleChange}
                required
                name="description"
                id="description"
                className=""
              />
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="price" className="mb-2">
                Price
              </label>
              <Input
                type="number"
                value={price}
                onChange={handleChange}
                required
                name="price"
                id="price"
                className=""
              />{" "}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2 flex gap-x-3 items-center justify-center px-3 mx-auto disabled:opacity-50  w-3/4 sm:w-1/2 bg-yellow-200 dark:bg-yellow-500"
            >
              {" "}
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> uploading product...
                </>
              ) : (
                "upload product"
              )}
            </button>
          </form>
        </TabsContent>
        <TabsContent value="products">
          {filteredProducts.length === 0 ? (
            <NoOrders text="No uploaded products" />
          ) : (
            <div className="w-full flex flex-wrap gap-3 justify-center items-center">
              {filteredProducts.map((product, index) => (
                <div
                  className="flex relative flex-col gap-y-2"
                  key={product._id}
                >
                  <button
                    disabled={delProdLoading}
                    onClick={() => deleteProduct(product._id, index)}
                    className="p-2 cursor-pointer disabled:cursor-not-allowed absolute top-0 left-0 bg-red-400 hover:bg-red-500 dark:bg-white rounded-[100%]"
                  >
                    {delProdLoading && index === ind ? (
                      <Loader2 className="text-black animate-spin" />
                    ) : (
                      <Trash2 className="dark:text-red-500 text-white" />
                    )}
                  </button>

                  <Image
                    src={urlForImage(product.images[0]).url()}
                    alt={product.name}
                    width={120}
                    height={120}
                    className={`block bg-gray-100 dark:bg-[#292e36]  rounded-lg h-36 w-36 sm:h-36 sm:w-36 object-cover `}
                  />
                  <p className="text-sm text-center sm:text-base">
                    {product.name}
                  </p>
                  <p className="text-sm text-center sm:text-base">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent
          value="stats"
          className="grid gap-3 py-4 place-items-center grid-cols-2 lg:grid-cols-3"
        >
          <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52]  rounded-xl shadow-md text-center">
            <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
              {Number(totalProfit).toFixed(2)}
            </p>
            <p className="text-gray-400 dark:text-zinc-400">Total Profit</p>
          </div>
          <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52]  rounded-xl shadow-md text-center">
            <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
              {filteredProducts.length}
            </p>
            <p className="text-gray-400 dark:text-zinc-400">
              Approved Products
            </p>
          </div>
        </TabsContent>
        <TabsContent
          value="business"
          className="flex relative flex-col gap-y-3 justify-center items-center"
        >
          {/* <button className='absolute top-3 hover:bg-gray-200 dark:hover:bg-zinc-600 px-3 py-2 rounded-lg right-4 flex gap-x-2' onClick={()=>setEdit(true)} >Edit <Pencil/></button> */}
          <Briefcase className="mx-auto w-16 h-16" />
          <p>
            {" "}
            <span className="font-semibold">Business Name:</span>{" "}
            {isSeller.name}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Business Specialty:</span>{" "}
            {isSeller.category}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Business Location:</span>{" "}
            {isSeller.location}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Your Contact:</span>{" "}
            {isSeller.sellerContact}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Payment Method:</span>{" "}
            {isSeller.paymentMethod}
          </p>
          {edit && (
            <>
              <div
                className="dark:backdrop-brightness-0 backdrop-brightness-50 z-[60]  fixed w-screen h-screen top-0 left-0"
                onClick={() => setEdit(false)}
              ></div>{" "}
              <button
                onClick={() => setEdit(false)}
                className="top-6 z-[70]  right-5 fixed"
              >
                <X className="text-white" />
              </button>{" "}
              <form
                onSubmit={updateSeller}
                className="flex w-3/4 fixed py-5 top-24 z-[70] bg-white p-2 rounded-lg left-[12%] flex-col gap-y-3"
              >
                <div className="w-[90%]  gap-x-2 sm:w-3/4 mx-auto">
                  <label>Name of Business</label>
                  <Input
                    type="text"
                    value={businessName}
                    onChange={handleSeller}
                    required
                    name="businessName"
                    id="name"
                    className=""
                  />
                </div>
                <div className="w-[90%]  gap-x-2 sm:w-3/4 mx-auto">
                  <label>Location of Business</label>

                  <Input
                    type="text"
                    value={location}
                    onChange={handleSeller}
                    required
                    name="location"
                    id="location"
                    className=""
                  />
                </div>
                <div className="w-[90%] gap-x-2 sm:w-3/4 mx-auto">
                  <label>Payment Method</label>

                  <div className="flex items-center gap-x-3">
                    <div className="flex gap-x-3">
                      <label>MoMo</label>

                      <Input
                        type="radio"
                        value="MoMo"
                        onChange={handleSeller}
                        required
                        name="paymentMethod"
                        id="paymentMethod"
                        className="h-5"
                      />
                    </div>
                    <div className="flex gap-x-3">
                      <label>Card</label>

                      <Input
                        type="radio"
                        value="card"
                        onChange={handleSeller}
                        required
                        name="paymentMethod"
                        id="paymentMethod"
                        className="h-5"
                      />
                    </div>
                  </div>
                </div>
                <Select required className="w-[90%] gap-x-2 sm:w-3/4 mx-auto">
                  <SelectTrigger className="w-[90%] gap-x-2 sm:w-3/4 mx-auto dark:border-zinc-600">
                    <SelectValue placeholder="choose a category" />
                  </SelectTrigger>
                  <SelectContent className="focus:outline-none bg-background  dark:bg-[#292e36] dark:border-zinc-600 border-black ">
                    <SelectGroup className="grid grid-cols-2">
                      {categories.map((category) => (
                        <SelectItem
                          value={category.value}
                          key={category.name}
                          className="dark:hover:bg-[#191c22]"
                          onClick={() => setCategory(category.value)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex w-[90%] gap-x-2 sm:w-3/4 items-center mx-auto">
                  <Input
                    type="checkbox"
                    value="card"
                    required
                    id="paymentMethod"
                    className="h-5 w-max"
                  />
                  <span>
                    Agree to{" "}
                    <Link
                      href="/become-seller/seller-terms-and-conditions"
                      className="underline"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  // onClick={uploadVideoAd}
                  disabled={updateLoading}
                  className="py-2 flex gap-x-3 items-center justify-center px-3 mx-auto disabled:opacity-50  w-3/4 sm:w-1/2 bg-yellow-200 dark:bg-yellow-500"
                >
                  {" "}
                  {updateLoading ? (
                    <>
                      <Loader2 className="animate-spin" /> registering
                      business...
                    </>
                  ) : (
                    "Become a seller"
                  )}
                </button>
              </form>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
