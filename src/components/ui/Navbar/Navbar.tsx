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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { logout } from "@/redux/feature/user/userSlice";
import { removeFromCart } from "@/redux/feature/cart/cart";

export default () => {
  const [state, setState] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const navigation = [
    { title: "Services", path: "/services" },
    { title: "Feedback", path: "/feed-back" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "FAQ", path: "/faq" },
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
          <div className="md:hidden space-x-3 flex items-center justify-center">
            {/* <div className=" relative py-2 mr-3">
              <Link href="/cart">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-sm text-white">
                    {cartItems?.length}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="file: mt-4 h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div> */}
            <Sheet>
              <SheetTrigger>
                <div className=" relative py-2 mr-3">
                  {/* <Link href="/cart"> */}
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-sm text-white">
                      {cartItems?.length}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="file: mt-4 h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {/* </Link> */}
                </div>
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                  <SheetTitle>
                    Book Your Services
                  </SheetTitle>
                  <SheetDescription>
                    {cartItems?.map((cartItem: any) => (
                      <div
                        className="md:flex items-strech py-3 md:py-5 lg:py-6 border-t border-gray-50"
                        key={cartItem?.id}
                      >
                        <div className=" w-full flex flex-col justify-center">
                          {/* <p className="text-xs leading-3 text-gray-800  md:pt-0 pt-4">
                              {cartItem?.id}
                            </p> */}
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800 ">
                              {cartItem?.title}
                            </p>

                            <div
                              className="cursor-pointer "
                              onClick={() =>
                                dispatch(
                                  removeFromCart(
                                    cartItem?.id
                                  )
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-red-600"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-xs leading-3 text-gray-600  pt-2">
                            {cartItem?.category}
                          </p>
                          <div className="flex items-center justify-between pt-5">
                            <SheetClose asChild>
                              <Link
                                href={`/booking?productId=${cartItem?.id}`}
                              >
                                <Button>Book</Button>
                              </Link>
                            </SheetClose>
                            <p className="text-base font-black leading-none text-gray-800 ">
                              ${cartItem?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
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
                  <Link
                    href={item.path}
                    className="block"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-5 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <div className="hidden md:block relative py-2 mr-3">
              <Sheet>
                <SheetTrigger>
                  <div className=" relative py-2 mr-3">
                    {/* <Link href="/cart"> */}
                    <div className="t-0 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-sm text-white">
                        {cartItems?.length}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="file: mt-4 h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    {/* </Link> */}
                  </div>
                </SheetTrigger>
                <SheetContent className="overflow-y-scroll">
                  <SheetHeader>
                    <SheetTitle>
                      Book Your Services
                    </SheetTitle>
                    <SheetDescription>
                      {cartItems?.map((cartItem: any) => (
                        <div
                          className="md:flex items-strech py-3 md:py-5 lg:py-6 border-t border-gray-50"
                          key={cartItem?.id}
                        >
                          <div className=" w-full flex flex-col justify-center">
                            {/* <p className="text-xs leading-3 text-gray-800  md:pt-0 pt-4">
                              {cartItem?.id}
                            </p> */}
                            <div className="flex items-center justify-between w-full pt-1">
                              <p className="text-base font-black leading-none text-gray-800 ">
                                {cartItem?.title}
                              </p>

                              <div
                                className="cursor-pointer "
                                onClick={() =>
                                  dispatch(
                                    removeFromCart(
                                      cartItem?.id
                                    )
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6 text-red-600"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className="text-xs leading-3 text-gray-600  pt-2">
                              {cartItem?.category}
                            </p>
                            <div className="flex items-center justify-between pt-5">
                              <SheetClose asChild>
                                <Link
                                  href={`/booking?productId=${cartItem?.id}`}
                                >
                                  <Button>Book</Button>
                                </Link>
                              </SheetClose>
                              <p className="text-base font-black leading-none text-gray-800 ">
                                ${cartItem?.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

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
                    <Avatar className="cursor-pointer border-[#97ce00] border-2 ">
                      <AvatarImage
                        height={30}
                        width={30}
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
                        <Link
                          href="/dashboard"
                          className="flex items-center"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center"
                        >
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
