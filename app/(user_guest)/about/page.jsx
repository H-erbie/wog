import React from 'react'
import { Users } from 'lucide-react'
import MiniNav from '@/components/mini-nav';
const Page = () => {
    const miniLinks = [
        { text: "home", link: "/" },
        { text: "about us", link: "" },
      ];
  return (
    <div className='main pt-24 flex justify-center items-center'>
              <MiniNav links={miniLinks} />

        <h1 className="text-3xl animate-pulse font-bold tracking-tight sm:text-4xl">
        About us
        <Users className='w-52 h-52'/>
      </h1>
    </div>
  )
}

export default Page