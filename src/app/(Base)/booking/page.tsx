"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const page = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [bookingItem, setBookingItem] = useState<any>(null);

  const cartItems = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      const bookingService = cartItems?.find(
        (item: any) => item.id === parseInt(productId)
      );
      setBookingItem(bookingService);
    }
  }, [productId, cartItems]);

  console.log(bookingItem);

  return (
    <div className="my-10">
      <div className="mt-5">
        <h2 className="text-center text-3xl font-semibold">
          Booking Of {bookingItem?.title}
        </h2>

        <div>
          <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
            <form>
              <div className="mb-4">
                <div className="block md:flex items-center space-x-0 md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="Address"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="Address"
                      name="address"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="block md:flex items-center space-x-0 md:space-x-2 my-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="zipCode"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Zip Code
                    </label>
                    <input
                      type="number"
                      id="zipCode"
                      name="zipCode"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="block md:flex items-center space-x-0 md:space-x-2 my-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="date"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
