"use client";
import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import React from "react";

const page = () => {
  const { data } = useGetBookingsQuery();

  console.log(data);

  return <div>booking page</div>;
};

export default page;
