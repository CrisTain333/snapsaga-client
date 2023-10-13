"use client";
import { useEffect, useState } from "react";
import logo from "../../../assets/icons/logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  useAppSelector,
  useAppDispatch,
} from "@/redux/hooks";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { logout } from "@/redux/feature/user/userSlice";

export default () => {
  const [state, setState] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigation = [
    { title: "Services", path: "/services" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target: any = e.target;
      if (!target!.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={` pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center  mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src={logo}
              width={30}
              alt="brand logo"
            />
            <p
              className={`font-semibold text-2xl ml-1  text-transparent bg-clip-text bg-gradient-to-r from-[#13a0ef] to-[#c7ec01]`}
            >
              napSaga
            </p>
          </Link>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-700 hover:text-gray-900 text-lg font-medium"
                >
                  <a
                    href={item.path}
                    className="block"
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-5 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  className="block font-semibold"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-semibold bg-gradient-to-r from-[#13a0ef] to-[#c7ec01] rounded-full md:inline-flex"
                >
                  Sign up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profileImage}
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/dashboard/profile">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => dispatch(logout())}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
