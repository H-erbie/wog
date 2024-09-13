"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";
import Image from "next/image";
import {
  X,
  Loader2, ArrowRight
} from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { slugify } from "@/sanity/lib/slugify"; // Assuming slugify function is in a separate file

const HomeAds = ({ ads }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAd, setShowAd] = useState("");
  const [adSlug, setAdSlug] = useState({})
  const videoRef = useRef(null);
  const slugy = async(name) =>{
    setAdSlug(await slugify(name))
  }
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);
  // console.log(ads, videos)
  if (videos.length === 0) {
    return <div className="flex gap-x-8 px-4 py-3"> {[0, 1, 2, 3].map((ghost, index) => (
      <div key={index} className="bg-gray-100 animate-pulse dark:bg-[#292e36] rounded-[100%] w-10% sm:h-24 h-10% sm:w-24"></div>
    ))}
    </div>
   }
  return (
    <div>
    <h2 className='text-xl font-bold ml-3 my-4'>Product ADs</h2>
    <div className="flex gap-x-8 px-4 no-scroll py-3 scroll-none overflow-x-scroll">
      {ads.map((ad) => (
        <Suspense           key={ad.name}
        fallback={<div className="bg-gray-100 animate-pulse dark:bg-[#292e36] rounded-[100%] h-36 w-36"></div>}>
        <Image
          src={urlForImage(ad?.thumbnail)}
          alt={ad.name}
          width={120}
          height={120}
          onClick={() => {
            setShowAd(ad)
          slugy(ad.name)
          }}
          className={`block bg-gray-100 dark:bg-[#292e36] outline p-1 outline-yellow-500  rounded-[100%] h-20 w-20 sm:h-28 sm:w-28 cursor-pointer hover:opacity-50 object-cover `}
        /></Suspense>
      ))}</div>
      <div className={` ${showAd ? "fixed" : "hidden"} top-0 left-0 z-[60] w-screen h-screen dark:backdrop-brightness-50 backdrop-blur-md `}>
        {loading && <Loader2 className='text-yellow-500 animate-spin'/>}
        <button  onClick={() => {
      setShowAd("");
      if (videoRef.current) {
        videoRef.current.pause(); // Pause the video
      }
    }} className='absolute p-3 rounded-[100%] bg-white dark:bg-black right-2 sm:right-10 top-5'>
        <X className='' /></button>
        {error && <p className="text-red-500">Error: {error}</p>}
        {videos.length > 0 && (
          <ul className='w-full h-full'>
            {videos.map((video) => {
              // console.log(video.url,showAd)
              if (video.url === showAd.url)
                return (
                  <li key={video.name} className="w-full flex sm:flex-row flex-col items-center justify-evenly h-full">
                    {/* Display video name and potentially a thumbnail or video player component */}
                    <video
                      ref={videoRef}
                      width="200"
                      height="200"
                      controls
                      className=" rounded-lg max-h-[80vh] w-auto h-auto"
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="">
                    <p className='text-xl text-center font-bold my-1'>{showAd.name} - GHS {showAd.price} </p>
                    <p className='text-lg sm:my-8 my-1 text-center font-medium '>{showAd.desc}</p>
                    <p className='text-base text-center font-medium my-1'>                    <Link href={`products/${adSlug.current}`} className='bg-yellow-500 w-max mx-auto rounded-lg flex gap-x-2 px-3 py-2'>See more about product<ArrowRight/> </Link>
</p></div>
                  </li>
                );
            })}
          </ul>
        )}
        {/* {videos.length === 0 && !loading && <p>No videos found.</p>} */}
      </div>
    </div>
  );
};

export default HomeAds;
