"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRegisterUserMutation } from "@/redux/feature/user/userApi";
import { Router } from "next/router";
import SmallLoader from "@/components/Loader/SmallLoader";

const page = () => {
  const [registerUser, { isLoading }] =
    useRegisterUserMutation();

  const test = true;

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      name,
      email,
      password,
    };

    console.log(data);
  };

  return (
    <div>
      {" "}
      <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Create an account
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-white  shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
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
                  name="password"
                  type="password"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <Button
                type="submit"
                className={`w-full px-4 py-2 text-white font-medium  rounded-md duration-150 ${
                  test
                    ? "bg-indigo-500 cursor-not-allowed"
                    : "bg-indigo-600 cursor-pointer"
                }`}
                disabled={test}
              >
                {test ? (
                  <SmallLoader
                    size="35"
                    color="white"
                  />
                ) : (
                  <>Create account </>
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
