"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import {
  BookUp2,
  PieChart,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

const page = ({}) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <div className=" px-5 py-4 rounded-md shadow-md">
        <h2 className="text-center text-3xl font-semibold">
          Dashboard
        </h2>
        <div className="grid grid-cols-12 gap-5 gap-y-5 gap-x-5 mt-5">
          <div className="col-span-12 md:col-span-4 rounded-md shadow-md">
            <Link href={"/dashboard/profile"}>
              <div className="flex flex-col space-y-3 items-center justify-center p-5 px-5">
                <UserCircle2 size={50} />
                <span className="text-2xl font-bold ">
                  Profile
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-4 rounded-md shadow-md">
            <Link href={"/dashboard/bookings"}>
              <div className="flex flex-col space-y-3 items-center justify-center p-5 px-5">
                <BookUp2 size={50} />
                <span className="text-2xl font-bold ">
                  Bookings
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-4 rounded-md shadow-md">
            <Link href={"/dashboard/track-bookings"}>
              <div className="flex flex-col space-y-3 items-center justify-center p-5 px-5">
                <PieChart size={50} />
                <span className="text-2xl font-bold ">
                  Track Bookings
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
