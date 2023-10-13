import React, { Suspense } from "react";
import Navbar from "../ui/Navbar/Navbar";
import Footer from "../ui/Footer/Footer";
import CustomProvider from "@/providers/CustomProvider";
import { Toaster } from "../ui/toaster";
import InitializeUser from "./initializeUser";

export default async function BaseComponent({
  children,
  showNavbar = true,
  showFooter = true,
  className = "w-[95%] mx-auto",
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}) {
  return (
    <CustomProvider>
      <Toaster />
      <div className={className}>
        {showNavbar && <Navbar />}
        {children}
        {showFooter && <Footer />}
      </div>
    </CustomProvider>
  );
}
