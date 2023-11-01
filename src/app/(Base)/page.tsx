import Hero from "@/components/ui/home/Hero/Hero";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import ServiceSection from "@/components/ui/home/ServiceSection/ServiceSection";
import CategorySection from "@/components/ui/home/CategorySection/CategorySection";
import SurveySection from "@/components/ui/home/SurveySection.tsx/SurveySection";
import Testimonials from "@/components/ui/home/Testimonials.tsx/Testimonials";
import NewsSection from "@/components/ui/home/NewsSection/NewsSection";
// import GallerySection from "@/components/ui/home/GallarySection/GallerySection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <CategorySection />
      {/* <SurveySection /> */}
      <Testimonials />
      <NewsSection />
      {/* <GallerySection /> */}
    </div>
  );
};

export default Home;
