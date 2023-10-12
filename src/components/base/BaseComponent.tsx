import React, { Suspense } from "react";
import Navbar from "../ui/Navbar/Navbar";
import Footer from "../ui/Footer/Footer";

export default async function BaseComponent({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) {
  return (
    <div className="w-[95%] mx-auto">
      {showNavbar && <Navbar />}
      {children}
      <Footer />
    </div>
  );
}
