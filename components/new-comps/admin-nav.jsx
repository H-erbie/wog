import React from "react";
import {
    User2,
    ShoppingCart,
    Search,
    X,
    Bell,
    Car,
    AlignJustify,
    Edit,
    ChevronDown,
    ShoppingBag,
    ChevronRight,
    Home, Briefcase, ShieldHalf, Phone, Album, Ticket, Group,
    AlignRight,
  } from "lucide-react";
const AdminNav = ({changeSection, activeSection}) => {
  const sidemenuLinks = [
    {
        text: "overview",
        icon: <ShieldHalf />,
      },
    {
      text: "home",
      icon: <Home />,
    },
    {
      text: "about",
      icon: <Briefcase />,
    },
  
    {
      id: 1,
      text: "events",
      icon: <Ticket />,
    },
    {
      id: 1,
      text: "gallery",
      icon: <Album />,
    },
  ];

  return (
    <div className="p-4 z-50 rounded-2xl bg-black fixed bottom-0 flex flex-row lg:flex-col gap-10 h-max w-max left-[10%] sm:left-[25%] lg:top-[25%] lg:left-0">
      {sidemenuLinks.map((link, index) => (
        <button onClick={()=>changeSection(link.text)} className={`text-red-500 ${activeSection === link.text ? 'bg-white' : ''} hover:bg-white p-2 transition-all cursor-pointer rounded-[100%]`} key={index}>
          {" "}
          {link.icon}{" "}
        </button>
      ))}
    </div>
  );
};

export default AdminNav;
