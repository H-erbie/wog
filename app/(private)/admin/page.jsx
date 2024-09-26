'use client'
import React, {useState} from "react";
import AdminOverview from "@/components/new-comps/admin-overview";
import AdminHome from "@/components/new-comps/admin-home";
import AdminAbout from "@/components/new-comps/admin-about";
import AdminEvents from "@/components/new-comps/admin-events";
import AdminGallery from "@/components/new-comps/admin-gallery";
import AdminNav from "@/components/new-comps/admin-nav";

const Page = () => {
const [activeSection, setActiveSection] = useState('overview')
const changeActiveSection = (section) => setActiveSection(section)
  return (
    <div>
      <AdminNav changeSection={changeActiveSection} activeSection={activeSection} />

      { activeSection === 'overview' ? <AdminOverview />:
     activeSection === 'home' ? <AdminHome />:
     activeSection === 'about' ? <AdminAbout />:
      activeSection === 'gallery' ?<AdminEvents />:
      <AdminGallery />}
    </div>
  );
};

export default Page;
