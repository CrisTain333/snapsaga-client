import Hero from "@/components/ui/home/Hero/Hero";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import ServiceSection from "@/components/ui/home/ServiceSection/ServiceSection";
import CategorySection from "@/components/ui/home/CategorySection/CategorySection";
import SurveySection from "@/components/ui/home/SurveySection.tsx/SurveySection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <CategorySection />
      <SurveySection />
    </div>
  );
};

export default Home;
