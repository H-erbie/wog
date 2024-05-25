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
if(videos.length === 0) return
  return (
    <div>
    <h2 className='text-xl font-bold my-4'>Product ADs</h2>
    <div className="flex gap-x-8 px-4 no-scroll py-3 scroll-none overflow-x-scroll">
      {ads.map((ad) => (
        <Suspense           key={ad.name}
        fallback={<div className="bg-gray-100 animate-pulse dark:bg-[#292e36] rounded-[100%] h-36 w-36"></div>}>
        <Image
          src={urlForImage(ad?.thumbnail)?.url()}
          alt={ad.name}
          width={120}
          height={120}
          onClick={() => {
            setShowAd(ad)
          slugy(ad.name)
          }}
          className={`block bg-gray-100 dark:bg-[#292e36] outline p-1 outline-yellow-500  rounded-[100%] h-28 w-28 cursor-pointer hover:opacity-50 object-cover `}
        /></Suspense>
      ))}</div>
      <div className={` ${showAd ? "fixed" : "hidden"} top-0 left-0 z-[60] w-screen h-screen backdrop-blur-md `}>
        {loading && <Loader2 className='text-yellow-500 animate-spin'/>}
        <button className='absolute right-10 top-16'>
        <X className=''  onClick={() => {
      setShowAd("");
      if (videoRef.current) {
        videoRef.current.pause(); // Pause the video
      }
    }}/></button>
        {error && <p className="text-red-500">Error: {error}</p>}
        {videos.length > 0 && (
          <ul className='w-full h-full'>
            {videos.map((video) => {
              // console.log(video.url,showAd)
              if (video.url === showAd.url)
                return (
                  <li key={video.name} className="w-full flex-col flex items-center justify-center h-full">
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
                    <p className='text-xl text-center font-bold my-1'>{showAd.name} - GHS {showAd.price} </p>
                    <p className='text-lg text-center font-medium my-1'>{showAd.desc}</p>
                    <p className='text-base text-center font-medium my-1'>                    <Link href={`products/${adSlug.current}`} className='bg-yellow-500 rounded-lg flex gap-x-2 px-3 py-2'>Check out product<ArrowRight/> </Link>
</p>
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
