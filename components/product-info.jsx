"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";
import moment from "moment";
import { useShoppingCart } from "use-shopping-cart";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  MdOutlineStarBorderPurple500,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";




export default function ProductInfo({ product, orders }) {
  const { addItem, incrementItem, cartDetails } = useShoppingCart();
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const fullname = currentUser && currentUser?.displayName;
  const username = fullname && fullname.split(" ");
  // const userPhone = currentUser?.phoneNumber;
  // const userEmail = currentUser?.email;
  // const avatar = fullname && fullname?.split("");
  const userId = user && currentUser?.uid;

  const [isLoading, setIsLoading] = useState(false);
  const userFirstName = username && username[0];

  const { toast } = useToast();
  const rates = [1, 2, 3, 4, 5];
  const isInCart = Boolean(cartDetails && cartDetails[product._id]);
  function addToCart() {
    const item = {
      ...product,
      id: product._id,
    };

    isInCart ? incrementItem(item._id) : addItem(item);
    toast({
      title: `${item.name} added!`,
      description: "Product added to cart",
      action: <Link href="/cart">Open Cart</Link>,
    });
  }
  let totalRate = 0;
  product.ratesReviews &&
    product.ratesReviews.map((ratesReview) => (totalRate += ratesReview.rate));

  const currentDate = moment().format("YYYY-MM-DD");

  const netRates = product && product.netRates;
  const fiveStars = product && product.Stars5;
  const fourStars = product && product.Stars4;
  const threeStars = product && product.Stars3;
  const twoStars = product && product.Stars2;
  const oneStars = product && product.Stars1;
  const w1 = (oneStars / netRates) * 100;
  const w2 = (twoStars / netRates) * 100;
  const w3 = (threeStars / netRates) * 100;
  const w4 = (fourStars / netRates) * 100;
  const w5 = (fiveStars / netRates) * 100;
  const [starNum, setStarNum] = useState(0);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const router = useRouter()
  // const { toast } = useToast();

  
  const handleRate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        body: JSON.stringify({
          id: product._id,
          review: text,
          rate: starNum,
          date: currentDate,
          userFirstName,
          subject,
          userId: user && userId,
        }),
      });
      // console.log(await res)
      setText("");
      setStarNum("");
      setSubject("");
      setIsLoading(false);
      toast({
        title: `Review added!`,
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      router.redirect('/');
    } catch (error) {
      console.log(error);
    }
  };
  const hasUserReviewed =
    product.ratesReviews &&
    product.ratesReviews.some((ratesReview) => ratesReview.userId === userId);
  const isPurchaser = orders.filter(
    (order) => order.purchaser.id === userId && order.isDelivered
  );
  const hasPurchasedProduct = isPurchaser.some((order) =>
    order.orderProducts.some(
      (orderProduct) => orderProduct.name === product.name
    )
  );
  // console.log(hasPurchasedProduct, hasUserReviewed);
  useEffect(() => {
    router.refresh()
    
  }, [router])
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:w-3/4 sm:mx-auto w-full">
      <h1 className="mx-0 lg:mx-0 sm:w-max lg:w-full sm:mx-auto text-3xl font-bold tracking-tight">
        {product.name}
      </h1>

      <div className="mt-3 mx-0 lg:mx-0 sm:mx-auto sm:w-max lg:w-full">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">GHS {Number(product.price).toFixed()}</p>
      </div>
      <div className="border-b dark:border-zinc-600 py-3 flex gap-3 mx-0 lg:mx-0 sm:mx-auto sm:w-max lg:w-full items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer ">
            <span className="flex gap-[2px] items-center dark:text-yellow-500 text-yellow-500 w-max text-3xl ">
              <>
                {netRates > 0 && (
                  <span className="mr-2">{totalRate / netRates}</span>
                )}{" "}
                {rates.map((rate) => (
                  <Button variant="primary" className="p-0 text-2xl" key={rate}>
                    <MdOutlineStarBorderPurple500 />
                  </Button>
                ))}
                <ChevronDown className="text-yellow-400" />
              </>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-blend-darken dark:bg-[#292e36] w-56 p-0">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-col">
                <h3 className="font-semibold py-2 text-xl text-center">
                  {netRates > 0 ? `0 out of 5` : "No ratings yet"}
                </h3>
                <div className="border-t flex gap-3 flex-col w-full pt-4">
                  <div className="flex gap-2 items-center">
                    <span>5</span>
                    <span className="text-yellow-500">
                      <MdOutlineStarPurple500 />
                    </span>
                    <span>({fiveStars})</span>
                    <span className="relative w-full bg-gray-300 dark:bg-white h-4 rounded-md">
                      <span
                        style={{ width: `${w5}%` }}
                        className={`bg-yellow-500 h-4 rounded-md absolute top-0 left-0`}
                      ></span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>4</span>
                    <span className="text-yellow-500">
                      <MdOutlineStarPurple500 />
                    </span>
                    <span>({fourStars})</span>
                    <span className="relative w-full bg-gray-300 dark:bg-white h-4 rounded-md">
                      <span
                        style={{ width: `${w4}%` }}
                        className={`bg-yellow-500 h-4 rounded-md absolute top-0 left-0`}
                      ></span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>3</span>
                    <span className="text-yellow-600">
                      <MdOutlineStarPurple500 />
                    </span>
                    <span>({threeStars})</span>
                    <span className="relative w-full bg-gray-300 dark:bg-white h-4 rounded-md">
                      <span
                        style={{ width: `${w3}%` }}
                        className={`bg-yellow-500 h-4 rounded-md absolute top-0 left-0`}
                      ></span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>2</span>
                    <span className="text-yellow-600">
                      <MdOutlineStarPurple500 />
                    </span>
                    <span>({twoStars})</span>
                    <span className="relative w-full bg-gray-300 dark:bg-white h-4 rounded-md">
                      <span
                        style={{ width: `${w2}%` }}
                        className={`bg-yellow-500 h-4 rounded-md absolute top-0 left-0`}
                      ></span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>1</span>
                    <span className="text-yellow-600">
                      <MdOutlineStarPurple500 />
                    </span>
                    <span>({oneStars})</span>
                    <span className="relative w-full bg-gray-300 dark:bg-white h-4 rounded-md">
                      <span
                        style={{ width: `${w1}%` }}
                        className={`bg-yellow-500 h-4 rounded-md absolute top-0 left-0`}
                      ></span>
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <span>
          {" "}
          {netRates > 0
            ? `${netRates} ${netRates === 1 ? "rating" : "ratings"}`
            : "No ratings yet"}
        </span>
      </div>

      <div className="my-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base ">{product.description}</div>
      </div>

      {/* <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(product.sizes[0])}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button onClick={()=> setSelectedSize(size)} key={size} variant={selectedSize === size ? "default" : "outline"} className="mr-2 mt-4">
            {getSizeName(size)}
          </Button>
        ))}
      </div> */}
      <form className="my-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-100  bg-[#292e36] py-6 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Add to cart
          </Button>
        </div>
      </form>

      {netRates === 0 ||
        (!netRates && (
          <p className="text-zinc-400 dark:text-gray-200 italic">
            No reviews yet. Buy the product and be the first to drop a review
          </p>
        ))}
      {product.ratesReviews && product.ratesReviews.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <h3 className="border-t dark:border-zinc-600 py-3 font-bold text-center text-xl">
            Read Customers&apos; reviews
          </h3>
          {product.ratesReviews &&
            product.ratesReviews.map((ratesReview) => (
              <div
                className="flex flex-col gap-y-3  dark:bg-[#292e36] hover:bg-blue-100 bg-secondary p-4 rounded-xl"
                key={ratesReview._key}
              >
                <p className="flex items-center gap-2">
                  <FaUserCircle className="text-lg" /> {ratesReview.firstName}
                </p>
                <div className="flex gap-x-3">
                  <span className="flex items-center gap-[2px] dark:text-yellow-400 text-yellow-500 w-max text-lg ">
                    <>
                      {" "}
                      {rates.map((rate, index) => {
                        const newIndex = index + 1;
                        if (newIndex <= ratesReview.rate)
                          return <MdOutlineStarPurple500 />;
                        return <MdOutlineStarBorderPurple500 key={rate} />;
                      })}
                    </>
                  </span>
                  <h3>{ratesReview.subject}</h3>
                </div>
                <p className="text-gray-400">{ratesReview.date}</p>
                <p>{ratesReview.review}</p>
              </div>
            ))}
        </div>
      )}
      {hasPurchasedProduct && !hasUserReviewed && (
        <form onSubmit={handleRate} className="mt-8" id="ratesReviews">
          <Label className="text-xl font-semibold">Rate this product</Label>
          <span className="flex items-center gap-[2px] dark:text-yellow-400 text-yellow-500 w-max  ">
            <>
              {" "}
              {rates.map((rate, index) => {
                if (rate > 0 && rate <= starNum)
                  return (
                    <Button
                      variant="primary"
                      type="button"
                      value={rate}
                      key={rate}
                      className="dark:hover:bg-[#292e36] my-4 text-3xl"
                      onChange={(e) => setStarNum(e.target.value)}
                      onClick={() => setStarNum(rate)}
                    >
                      <MdOutlineStarPurple500 />{" "}
                    </Button>
                  );
                return (
                  <Button
                    variant="primary"
                    type="button"
                    value={rate}
                    key={rate}
                    className="dark:hover:bg-[#292e36]  my-4 text-3xl"
                    onChange={(e) => setStarNum(e.target.value)}
                    onClick={() => {
                      setStarNum(rate);
                    }}
                  >
                    <MdOutlineStarBorderPurple500 key={rate} />
                  </Button>
                );
              })}
            </>
          </span>
          <div className="flex flex-col gap-y-4">
            <Label className="text-xl font-semibold">Review Subject</Label>

            <Input
              id="subject"
              name="subject"
              required
              type="text"
              autoComplete="off"
              // defaultValue={defaultSearchQuery}
              placeholder="review summary"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-9 dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />

            <Label className="text-xl font-semibold">
              Write a review for this product
            </Label>
            <Textarea
              required
              placeholder="Enter a review"
              className="resize-none dark:border-zinc-600"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              className=' dark:bg-white dark:text-black dark:hover:bg-gray-100  bg-[#292e36]'
              disabled={starNum === 0 || isLoading ? true : false}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </div>
          {starNum === 0 && (
            <p className="text-red-500 items-center justify-center flex">
              Rate(
              <MdOutlineStarPurple500 />) the product
            </p>
          )}
        </form>
      )}
    </div>
  );
}
