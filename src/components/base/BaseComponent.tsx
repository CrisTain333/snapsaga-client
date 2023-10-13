import React, { Suspense } from "react";
import Navbar from "../ui/Navbar/Navbar";
import Footer from "../ui/Footer/Footer";
import CustomProvider from "@/providers/CustomProvider";
import { Toaster } from "../ui/toaster";

export default async function BaseComponent({
  children,
  showNavbar = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}) {
  return (
    <CustomProvider>
      <Toaster />
      <div className="w-[95%] mx-auto">
        {showNavbar && <Navbar />}
        {children}
        {showFooter && <Footer />}
      </div>
    </CustomProvider>
  );
}
