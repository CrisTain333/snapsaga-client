import Hero from "@/components/ui/home/Hero/Hero";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import ServiceSection from "@/components/ui/home/ServiceSection/ServiceSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
    </div>
  );
};

export default Home;
