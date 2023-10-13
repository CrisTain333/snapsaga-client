import React from "react";
import Link from "next/link";
import {
  BookUp2,
  LayoutDashboard,
  LogOut,
  PieChart,
  UserCircle2,
} from "lucide-react";
import { logout } from "@/redux/feature/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="w-full bg-white text-black rounded-[10px] p-4 pt-8 shadow-md">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          // onClick={() => setActive(1)}
        >
          <Link href="/dashboard">
            <LayoutDashboard size={20} />
            <span
              className={`pl-3 
              text-[black]
             md:block hidden`}
            >
              Dashboard
            </span>
          </Link>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8">
          <Link href="/dashboard/profile">
            <UserCircle2 size={20} />
            <span
              className={`pl-3 
              text-[black]
             md:block hidden`}
            >
              Profile
            </span>
          </Link>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8">
          <BookUp2
            size={20}
            // color={active === 2 ? "red" : ""}
          />
          <span
            className={`pl-3 
              text-[black]
             md:block hidden`}
          >
            Bookings
          </span>
        </div>

        <div className="flex items-center cursor-pointer w-full mb-8 ">
          <PieChart size={20} />
          <span
            className={`pl-3 
              text-[black]
             md:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => dispatch(logout)}
        >
          <LogOut
            size={20}
            // color={active === 8 ? "red" : ""}
          />
          <span
            className={`pl-3 
              text-[black]
             md:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
