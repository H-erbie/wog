"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { SlugInput } from "sanity";
import Image from "next/image";
import { Loader2, Pencil, Check, Trash2, X, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlForImage } from "@/sanity/lib/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { storage } from "@/firebase/config";
import {
  ref,
  listAll,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import thumb from "public/thumbnail.png";
import NoOrders from "./no-orders";
import defaultImageUrl from "@/public/andamo-logo.png";

const AdminProducts = ({ products, ads, sellers }) => {
  const [prods, setProds] = useState(products);
  const [sells, setSells] = useState(sellers);
  const router = useRouter();
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [ind, setInd] = useState(0);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [fetchVids, setFetchVids] = useState(false);
  // console.log(sells, sellers, products);
  useEffect(() => {
    const fetchVideos = async () => {
      setFetchVids(true);
      setError(null);

      try {
        const adsRef = ref(storage, "ads");

        const allVideos = await listAll(adsRef);
        const videoData = allVideos.items.map(async (itemRef) => ({
          name: itemRef.name,
          url: await getDownloadURL(itemRef), // Get download URL for each item
        }));

        // Wait for all video URLs to be fetched before setting state
        const resolvedVideos = await Promise.all(videoData);
        setVideos(resolvedVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message); // Set error message for display
      } finally {
        setFetchVids(false);
      }
    };

    fetchVideos();
  }, [videos]);
  const [showEditProduct, setShowEditProduct] = useState({
    show: false,
    id: "",
  });
  useEffect(() => {
    // router.refresh();
    setProds(products);
  }, [products]);
  useEffect(() => {
    // router.refresh();
    setSells(sellers);
  }, [sellers]);
  const { toast } = useToast();

  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: 0,
    categories: "",
    homepageCategories: "",
    description: "",
  });
  const { name, sku, price, categories, homepageCategories, description } =
    productData;
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
  const [videosData, setVideosData] = useState({
    videoPrice: "",
    videoName: "",
    desc: "",
  });
  const { videoName, videoPrice, desc } = videosData;
  const [vid, setVid] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const handleVideo = async (event) => {
    const { name, value, files } = event.target;

    if (name === "vid") {
      // setVideosData({ ...videosData, video: files[0] }); // Set the image preview URL
      // console.log(files);
      setVid(files[0]);
    }
    if (name === "thumb") {
      // setVideosData({ ...videosData, thumb: files[0] }); // Set the image preview URL
      // console.log(files);
      setThumbnail(files[0]);
    } else {
      setVideosData({ ...videosData, [name]: value }); // Set the image preview URL
    }
  };
  // console.log(vid);
  //  const slg = SlugInput(name)

  const [loadingVideo, setLoadingVideo] = useState(false);
  const uploadVideoAd = async (e) => {
    e.preventDefault();
    setLoadingVideo(true);
    // console.log("start1");

    if (vid && thumbnail) {
      const storageRef = ref(storage, `/ads/${vid.name}`); // Create a reference to the file location

      try {
        // console.log("start2");
        const uploadTask = uploadBytesResumable(storageRef, vid); // Upload the video file with resumable uploads
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            console.error("Error uploading video:", error);
            setLoadingVideo(false);
            toast({
              title: `Failed to add new AD!`,
              variant: "destructive",
              //     // description: "Product added to cart",
              //     // action: <Link href="/cart">Open Cart</Link>,
            });
          },
          async () => {
            // Upload completed successfully
            console.log("Video uploaded successfully!");
            const videoUrl = await getDownloadURL(storageRef);

            // Update product data with videoUrl before creating product
            const formData = new FormData();
            formData.append("name", videoName);
            formData.append("url", videoUrl);
            formData.append("thumbnail", thumbnail);
            formData.append("price", Number(videoPrice).toFixed(2));
            formData.append("desc", desc);
            const response = await fetch("/api/ads", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            if (vid) {
              toast({
                title: `Added new AD!`,
                // description: "Product added to cart",
                // action: <Link href="/cart">Open Cart</Link>,
              });
              videoRef.current = null;
              thumbnailRef.current = null;
              setVideosData({
                ...videosData,
                videoPrice: "",
                videoName: "",
                desc: "",
              });
              setVid("");
              setThumbnail("");
              setLoadingVideo(false);

              // Handle successful product creation (e.g., clear form, show success message)
            } else {
              toast({
                title: `Failed to add new AD!`,
                variant: "destructive",
                // description: "Product added to cart",
                // action: <Link href="/cart">Open Cart</Link>,
              });
              // Handle creation error (e.g., show error message to user)
            }
            setLoadingVideo(false); // Update loading state after successful upload
          }
        );
        // setLoadingVideo(false);
      } catch (err) {
        console.log(err);
        setLoadingVideo(false); // Update loading state after successful upload
        toast({
          title: `Failed to add new AD!`,
          variant: "destructive",
          //     // description: "Product added to cart",
          //     // action: <Link href="/cart">Open Cart</Link>,
        });
      }
    }
  };
  const [delVidLoading, setVidLoading] = useState(false);
  const [adVidIdx, setAdVidIdx] = useState(0);

  const deleteVideo = async (videoName, url, index) => {
    const filterAds = ads.filter((ad) => {
      // console.log(url === ad.url)
      return ad.url === url;
    }); //  Return true only if URLs match    })
    console.log(filterAds);
    setAdVidIdx(index);
    setVidLoading(true);
    try {
      const videoRef = ref(storage, `/ads/${videoName}`); // Assuming 'name' property holds the video filename

      await deleteObject(videoRef);
      const response = await fetch("/api/delete-ad", {
        method: "POST",
        body: JSON.stringify({
          _id: filterAds[0]._id,
        }),
      });
      setVidLoading(false);
      setAdVidIdx(0);
    } catch (error) {
      console.error(error);
      setVidLoading(false);
      setAdVidIdx(0);
    }
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.set("imgs", imageFile);
    formData.set("sku", "andamo");
    formData.append("price", Number(productData.price).toFixed(2));
    formData.append("description", productData.description);
    formData.append("categories", productData.categories); // Optional
    formData.append("homepageCategories", productData.homepageCategories); // Optional

    try {
      const response = await fetch("/api/products", {
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

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.set("imgs", imageFile);
    formData.set("id", showEditProduct.id);
    formData.append("price", Number(productData.price).toFixed(2));
    formData.append("description", productData.description);
    formData.append("categories", productData.categories); // Optional
    formData.append("homepageCategories", productData.homepageCategories); // Optional

    try {
      const response = await fetch("/api/update-product", {
        method: "POST",
        body: formData,
      });

      // const data = await response.json();
      if (response) {
        setShowEditProduct({ ...showEditProduct, show: false, id: "" });
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
  const [approve, setApprove] = useState(false);
  const [decline, setDecline] = useState(false);
  const approveProduct = async (product, index) => {
    setApprove(true);
    setInd(index);

    try {
      const response = await fetch("/api/approve-seller-product", {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          _id: product._id,
          price: product.price,
          description: product.description,
          categories: product.categories[0],
          image: product.images[0],
          slug: product.slug,
          sku: product.sku,
        }),
      });

      // const data = await response.json();
      if (response) {
        toast({
          title: `Approved seller product!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });

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
      setApprove(false);
    }
  };
  const declineProduct = async (_id, index) => {
    setDecline(true);
    setInd(index);
    try {
      const response = await fetch("/api/del-product", {
        method: "POST",
        body: JSON.stringify({
          _id,
        }),
      });
      if (response) {
        // setProds(products);
        toast({
          title: `Deleted product!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        setDecline(false);
      } else {
        toast({
          title: `Failed to delete product!`,
          variant: "destructive",
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        setDecline(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to delete product!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      setDecline(false);
    }
  };
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
        setProds(products);
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

  // const imageFilesArray = Array.from(imageFile); // Convert FileList to array
  return (
    <div className="pb-32">
      <h1 className="text-xl my-3 w-max font-bold flex items-center gap-x-2 mx-auto">
        Manage Prducts <ShoppingBag />
      </h1>
      <Tabs defaultValue="products" className="">
        <TabsList className="lg:text-lg mx-auto mt-4 text-sm md:text-base">
          {/* <TabsTrigger value="upload">Upload Products</TabsTrigger> */}
          <TabsTrigger value="products">All Products</TabsTrigger>
          {/* <TabsTrigger value="ads">Upload ADs</TabsTrigger> */}
          <TabsTrigger value="all-ads">All ADs</TabsTrigger>
          <TabsTrigger value="requests">Sellers Requests</TabsTrigger>
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
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="sku">Product Source</label>
              <Input
                type="text"
                value={sku}
                onChange={handleChange}
                required
                name="sku"
                id="sku"
              />
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
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
            </div>{" "}
            <div className="w-[90%] sm:w-3/4 mx-auto">
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
            </div>{" "}
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

        <TabsContent value="products" className="pb-7">
          <div className="w-full flex flex-wrap gap-3 justify-center items-center">
            {prods.map((product, index) => (
              <div className="flex relative flex-col gap-y-2" key={product._id}>
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
                <button
                  disabled={delProdLoading}
                  onClick={() =>
                    setShowEditProduct({
                      ...showEditProduct,
                      show: true,
                      id: product._id,
                    })
                  }
                  className="p-2 cursor-pointer  absolute top-0 right-0 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 rounded-[100%]"
                >
                  {delProdLoading && index === ind ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Pencil className="text-yellow-500" />
                  )}
                </button>

                <Image
                  src={urlForImage(
                    product?.images?.[0] && product?.images?.[0]
                  )}
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
          {showEditProduct.show && (
            <>
              <div
                onClick={() =>
                  setShowEditProduct({
                    ...showEditProduct,
                    id: "",
                    show: false,
                  })
                }
                className="backdrop-brightness-[.2] z-[60] dark:backdrop-brightness-0 fixed w-screen h-screen top-0 left-0"
              ></div>
              <div className="fixed w-screen z-[60] h-screen top-0 left-0 ">
                <button
                  onClick={() =>
                    setShowEditProduct({
                      ...showEditProduct,
                      id: "",
                      show: false,
                    })
                  }
                >
                  <X className="top-5 text-white right-5 absolute" />
                </button>
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
                <form
                  onSubmit={updateProduct}
                  className="flex flex-col gap-y-3"
                >
                  <div className="w-[90%] sm:w-3/4 mx-auto">
                    <label htmlFor="imgs" className="mb-2 text-white">
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
                    <label htmlFor="name" className="mb-2 text-white">
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
                  <div className="w-[90%] sm:w-3/4 mx-auto">
                    <label htmlFor="sku" className="text-white">
                      Product Source
                    </label>
                    <Input
                      type="text"
                      value={sku}
                      onChange={handleChange}
                      required
                      name="sku"
                      id="sku"
                    />
                  </div>
                  <div className="w-[90%] sm:w-3/4 mx-auto">
                    <label htmlFor="categories" className="mb-2 text-white">
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
                  </div>{" "}
                  <div className="w-[90%] sm:w-3/4 mx-auto">
                    <label
                      htmlFor="homepageCategories"
                      className="mb-2 text-white"
                    >
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
                  </div>{" "}
                  <div className="w-[90%] sm:w-3/4 mx-auto">
                    <label htmlFor="description" className="mb-2 text-white">
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
                    <label htmlFor="price" className="mb-2 text-white">
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
                        <Loader2 className="animate-spin" /> updating product...
                      </>
                    ) : (
                      "update product"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="ads" className="pb-7">
          {thumbnail && (
            <div className="w-full flex flex-wrap justify-center items-center gap-2">
              {/* // {imageFile.map((img, ind) => ( */}
              <img
                src={URL.createObjectURL(thumbnail)}
                // key={ind}
                alt="Selected Video Default Thumbnail"
                className="w-[20%] w-max-[150px] w-min-[80px]"
              />
              {/* // ))} */}
            </div>
          )}
          <form
            onSubmit={uploadVideoAd}
            className="w-full flex flex-wrap gap-3 justify-center items-center"
          >
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="vid" className="mb-2">
                Video
              </label>
              <Input
                type="file"
                onChange={handleVideo}
                accept="video/*"
                name="vid"
                id="vid"
                className=""
                ref={videoRef} // Assign videoRef
              />
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="thumb" className="mb-2">
                Thumbnail
              </label>
              <Input
                type="file"
                onChange={handleVideo}
                accept="image/*"
                name="thumb"
                id="thumb"
                className=""
                ref={thumbnailRef} // Assign thumbnailRef
              />
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="price" className="mb-2">
                Name
              </label>
              <Input
                type="text"
                value={videoName}
                onChange={handleVideo}
                required
                name="videoName"
                id="videoName"
                className=""
              />{" "}
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="price" className="mb-2">
                Description
              </label>
              <Input
                type="text"
                value={desc}
                onChange={handleVideo}
                required
                name="desc"
                id="desc"
                className=""
              />{" "}
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
              <label htmlFor="price" className="mb-2">
                Price
              </label>
              <Input
                type="number"
                value={videoPrice}
                onChange={handleVideo}
                required
                name="videoPrice"
                id="videoPrice"
                className=""
              />{" "}
            </div>
            <button
              type="submit"
              // onClick={uploadVideoAd}
              disabled={loadingVideo}
              className="py-2 flex gap-x-3 items-center justify-center px-3 mx-auto disabled:opacity-50  w-3/4 sm:w-1/2 bg-yellow-200 dark:bg-yellow-500"
            >
              {" "}
              {loadingVideo ? (
                <>
                  <Loader2 className="animate-spin" /> uploading Ad...
                </>
              ) : (
                "upload Ad"
              )}
            </button>
          </form>
        </TabsContent>
        <TabsContent value="all-ads">
          {videos.length === 0 ? (
            <NoOrders text="No ADs" />
          ) : (
            <ul className="flex flex-wrap gap-3 items-center justify-center">
              {videos.map((video, index) => {
                // console.log(video.url,showAd)
                // if (video.url === showAd.url)
                return (
                  <li
                    key={video.name}
                    className="relative flex-col flex items-center justify-center h-full"
                  >
                    {/* Display video name and potentially a thumbnail or video player component */}
                    <button
                      disabled={delVidLoading}
                      onClick={() => deleteVideo(video.name, video.url, index)}
                      className="p-2 z-30 cursor-pointer rounded-l-none disabled:cursor-not-allowed absolute top-0 left-0 bg-red-400 hover:bg-red-500 dark:bg-white dark:hover:bg-gray-100 rounded-[100%]"
                    >
                      {delVidLoading && index === adVidIdx ? (
                        <Loader2 className="text-black animate-spin" />
                      ) : (
                        <Trash2 className="dark:text-red-500 text-white" />
                      )}
                    </button>

                    <video
                      // ref={videoRef}
                      width="200"
                      height="200"
                      controls
                      className=" rounded-lg max-h-[80vh] w-auto h-auto"
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="requests">
          {sells.length === 0 ? (
            <NoOrders text="No Requests" />
          ) : (
            <div className="w-full flex py-6 flex-wrap gap-3 justify-center items-center">
              {sells.map((product, index) => (
                <div
                  className="flex relative flex-col gap-y-2"
                  key={product._id}
                >
                  <button
                    disabled={decline}
                    onClick={() => declineProduct(product._id, index)}
                    className="p-2 cursor-pointer disabled:cursor-not-allowed absolute top-0 left-0 bg-red-400 hover:bg-red-500 dark:bg-white rounded-[100%]"
                  >
                    {decline && index === ind ? (
                      <Loader2 className="text-black animate-spin" />
                    ) : (
                      <X className="dark:text-red-500 text-white" />
                    )}
                  </button>
                  <button
                    disabled={approve}
                    onClick={() => approveProduct(product, index)}
                    className="p-2 cursor-pointer disabled:cursor-not-allowed absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 dark:bg-white rounded-[100%]"
                  >
                    {approve && index === ind ? (
                      <Loader2 className="text-black animate-spin" />
                    ) : (
                      <Check className="text-yellow-500 " />
                    )}
                  </button>

                  <Image
                    src={urlForImage(product.images[0])}
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
      </Tabs>
    </div>
  );
};

export default AdminProducts;
