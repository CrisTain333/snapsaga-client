import Hero from "@/components/ui/home/Hero/Hero";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import ServiceSection from "@/components/ui/home/ServiceSection/ServiceSection";
import CategorySection from "@/components/ui/home/CategorySection/CategorySection";
import SurveySection from "@/components/ui/home/SurveySection.tsx/SurveySection";
import Testimonials from "@/components/ui/home/Testimonials.tsx/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <CategorySection />
      <SurveySection />
      <Testimonials />
    </div>
  );
};

export default Home;
