import Link from "next/link";
import React from "react";
import {
    Hourglass, Clock, Clock1
  } from "lucide-react";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpEvent from '@/components/new-comps/up-events'
import PastEvent from '@/components/new-comps/past-events'

const Events = () => {
 

  return (
    <div className="p-5">
      <Tabs defaultValue="upcoming" className="">
          <TabsList className="lg:text-lg mx-auto mt-4 text-sm md:text-base">
            
            <TabsTrigger value="upcoming" className='flex gap-x-3'>Upcoming Events <Hourglass/></TabsTrigger>
            <TabsTrigger value="past" className='flex gap-x-3'>Past Events <Clock1/></TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
              <UpEvent/>
          </TabsContent>
          <TabsContent value="past">
              <PastEvent/>
          </TabsContent>
          </Tabs>
    </div>
  );
};

export default Events;
