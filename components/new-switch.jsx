'use client'
import React, { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const NewSwitch = ({status}) => {
  const [isOn, setIsOn] = useState(status);

  const handleClick = () => {
    setIsOn(!isOn);
  };
  return <div onClick={handleClick} className="text-primary text-4xl"> {isOn? <FaToggleOn /> : <FaToggleOff />}</div>;
};

export default NewSwitch;
