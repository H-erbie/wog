import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Socials = () => {
  const social = [
    {
      id: 1,
      name: "twiter",
      icon: <Twitter />,
    },
    {
      id: 2,
      name: "instagram",
      icon: <Instagram />,
    },
    {
      id: 3,
      name: "facebook",
      icon: <Facebook />,
    },
  ];
  return (
    <div className="flex gap-x-3">
      {social.map((soc) => (
        <span
          key={soc.id}
          className="flex items-center hover:text-red-500 gap-2 capitalize text-lg"
        >
          {soc.icon}
        </span>
      ))}
    </div>
  );
};

export default Socials;
