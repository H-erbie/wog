import React from 'react'
import { Twitter, Facebook, Instagram } from 'lucide-react'

const Socials = () => {
    const social = [
        {
            id: 1,
            name: 'twiter',
            icon: <Twitter/>
        },
        {
            id: 2,
            name: 'instagram',
            icon: <Instagram/>
        },
        {
            id: 3,
            name: 'facebook',
            icon: <Facebook/>
        },
    ] 
  return (
    < >
        {
            social.map(soc => (
                <span key={soc.id} className='flex items-center hover:text-yellow-500 gap-2 capitalize text-lg'>{soc.name}{soc.icon}</span>
            ))
        }
    </>
  )
}

export default Socials