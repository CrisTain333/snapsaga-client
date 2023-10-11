import React, { Suspense } from "react";
import Navbar from "../ui/Navbar/Navbar";

export default async function BaseComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
