"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "../../../assets/icons/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/feature/user/userApi";
import Loader from "@/components/Loader/Loader";
import { useAppDispatch } from "@/redux/hooks";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  getUser,
  setToken,
} from "@/redux/feature/user/userSlice";
import { ToastAction } from "@radix-ui/react-toast";

const page = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  // const searchParams = useSearchParams();

  const redirectTo = "/";

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email,
      password,
    };
    const response: any = await loginUser(data);
    const { data: responseData, error } = response;

    if (responseData?.statusCode === 200) {
      toast({
        title: responseData?.message,
      });
      dispatch(setToken(responseData?.data?.token));
      await dispatch(getUser());
      router.push(redirectTo);
    } else {
      toast({
        variant: "destructive",
        duration: 2500,
        title: error?.data?.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => form.reset()}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div>
      <main className="w-full flex">
        <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
          <div className="relative z-10 w-full max-w-md">
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src={logo}
                width={50}
                alt="brand logo"
              />
              <p
                className={`font-semibold text-5xl ml-1  text-transparent bg-clip-text bg-gradient-to-r from-[#13a0ef] to-[#97ce00]`}
              >
                napSaga
              </p>
            </Link>
            <div className=" mt-16 space-y-3">
              <h3 className="text-white text-3xl font-bold">
                SnapSaga is where every image becomes a
                story.
              </h3>
              <p className="text-gray-300">
                SnapSaga is where every image becomes a
                story. We capture life's precious moments
                with creativity and passion, transforming
                them into timeless visual narratives.
                Experience the art of storytelling through
                our lens.
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden">
                <Image
                  alt="rendom_image"
                  height={20}
                  width={20}
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <Image
                  width={20}
                  alt="rendom_image"
                  height={20}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <Image
                  width={20}
                  alt="rendom_image"
                  height={20}
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <Image
                  width={20}
                  alt="rendom_image"
                  height={20}
                  src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className="text-sm text-gray-400 font-medium translate-x-5">
                  Join 5.000+ users
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 my-auto h-[500px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(41,197,248,255) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(41,197,248,255) 90.55%)",
              filter: "blur(118px)",
            }}
          ></div>
        </div>
        <div className="flex-1 flex items-center justify-center h-screen">
          <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
            <div className="">
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Log in
                </h3>
                <p className="">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            <div className="relative"></div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="true"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <Button
                className="w-full px-4 py-2 text-white font-medium bg-gradient-to-r from-[#13a0ef] to-[#97ce00] rounded-lg duration-150"
                // disable={isLoading}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader
                    size="32"
                    color="white"
                  />
                ) : (
                  <>Log in </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
