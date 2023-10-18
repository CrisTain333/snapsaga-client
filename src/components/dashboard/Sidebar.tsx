import React from "react";
import Link from "next/link";
import {
  BookUp2,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  PieChart,
  ServerCog,
  User,
  UserCircle2,
  UserCog,
} from "lucide-react";
import { logout } from "@/redux/feature/user/userSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="w-full bg-white text-black rounded-[10px] p-4 pt-8 shadow-md">
        <Link href="/dashboard">
          <div className="flex items-center cursor-pointer w-full mb-8">
            <LayoutDashboard size={20} />
            <span
              className={`pl-3 
              text-[black]
             md:block hidden`}
            >
              Dashboard
            </span>
          </div>
        </Link>

        {/*  ------------------------------For User------------------  */}

        {user?.role === "user" && (
          <>
            <Link href="/dashboard/profile">
              <div className="flex items-center cursor-pointer w-full mb-8">
                <UserCircle2 size={20} />
                <span
                  className={`pl-3 
              text-[black]
             md:block hidden`}
                >
                  Profile
                </span>
              </div>
            </Link>
            <Link href="/dashboard/booking">
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
            </Link>

            <Link href="/dashboard/track-booking">
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
            </Link>
          </>
        )}

        {/*   ------------------------------For Admin ------------------  */}

        {user?.role === "admin" && (
          <>
            <Link href="/dashboard/profile">
              <div className="flex items-center cursor-pointer w-full mb-8">
                <UserCircle2 size={20} />
                <span
                  className={`pl-3 
              text-[black]
             md:block hidden`}
                >
                  Profile
                </span>
              </div>
            </Link>
            <Link href="/dashboard/users">
              <div className="flex items-center cursor-pointer w-full mb-8">
                <UserCog
                  size={20}
                  // color={active === 2 ? "red" : ""}
                />
                <span
                  className={`pl-3 
              text-[black]
             md:block hidden`}
                >
                  User Management
                </span>
              </div>
            </Link>
            <Link href="/dashboard/services">
              <div className="flex items-center cursor-pointer w-full mb-8">
                <ServerCog
                  size={20}
                  // color={active === 2 ? "red" : ""}
                />
                <span
                  className={`pl-3 
              text-[black]
             md:block hidden`}
                >
                  Service Management
                </span>
              </div>
            </Link>
          </>
        )}

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
