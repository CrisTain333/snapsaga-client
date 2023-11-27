"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCreateBookingMutation } from "@/redux/feature/booking/bookingApi";
import { ToastAction } from "@radix-ui/react-toast";
import Loader from "@/components/Loader/Loader";
import OrderSuccess from "@/components/BookingSuccessMessage/BookingSuccessMessage";
import { removeFromCart } from "@/redux/feature/cart/cart";

const page = () => {
  const searchParams = useSearchParams();
  const productId: string | null =
    searchParams.get("productId");
  const [bookingItem, setBookingItem] = useState<any>(null);
  const { user } = useAppSelector((state) => state.auth);

  const [isSuccess, setIsSuccessTrue] = useState(false);
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const cartItems: any = useAppSelector(
    (state) => state.cart
  );

  const [createBooking, { isLoading }] =
    useCreateBookingMutation();

  useEffect(() => {
    if (productId) {
      const bookingService = cartItems?.find(
        (item: any) => item.id === parseInt(productId)
      );
      setBookingItem(bookingService);
    }
  }, [productId, cartItems]);

  const handleBookingSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const zipCode = form.zipCode.value;
    const address = form.address.value;
    const date = form.date.value;

    const bookingData = {
      userId: parseInt(user?.id),
      serviceId: parseInt(productId as string),
      bookingInfo: {
        name,
        email,
        phone,
        address,
        date,
        zipCode,
      },
    };

    const response: any = await createBooking(bookingData);
    const { data: responseData, error } = response;

    if (responseData?.statusCode === 200) {
      setIsSuccessTrue(true);
      dispatch(removeFromCart(parseInt(productId!)));
      toast({
        title: responseData?.message,
      });
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

  if (isSuccess) {
    return (
      <div>
        <OrderSuccess />
      </div>
    );
  }

  return (
    <div className="my-10">
      {/* <div className="mt-5">
        <h2 className="text-center text-3xl font-semibold">
          Booking Of {bookingItem?.title}
        </h2>

        <div>
          <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
            <form onSubmit={handleBookingSubmit}>
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
                      placeholder="your name eg:cristain"
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
                      placeholder="your address"
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
                      placeholder="your zip code"
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
                      placeholder="your email eG:snap-sega@gmail.com"
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
                      placeholder="your phone number eg:+990020000"
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
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {isLoading ? (
                    <>
                      <div className="flex items-center">
                        <Loader
                          color="white"
                          size="32"
                        />
                        <span className="ml-1">
                          Submitting ....
                        </span>
                      </div>
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <div className="">
        <div className="relative mx-auto  mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
            Book an Service
          </h1>
          <p className="mt-6 text-lg text-white">
            Get a Photo shoot with our experienced
            photographer
          </p>
          <img
            className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>

        <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
          <div className="">
            <p className="font-serif text-xl font-bold text-blue-900">
              Provide Booking Information
            </p>
            <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative"></div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  // for="radio_2"
                >
                  <span className="mt-2 font-medium">
                    Retirement Planning
                  </span>
                  <span className="text-xs uppercase">
                    1 Hour
                  </span>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_3"
                  type="radio"
                  name="radio"
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  // for="radio_3"
                >
                  <span className="mt-2 font-medium">
                    Investment Advice
                  </span>
                  <span className="text-xs uppercase">
                    1 Hour
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="">
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">
              Select Booking date
            </p>
          </div>

          <button className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">
            Book Now
          </button>
        </div>
      </div>
      <script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></script>
    </div>
  );
};

export default page;
