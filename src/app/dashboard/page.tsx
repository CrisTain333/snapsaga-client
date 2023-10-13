"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

const page = ({}) => {
  const { user } = useAppSelector((state) => state.auth);

  return <div>dashboard page {user?.name}</div>;
};

export default page;
