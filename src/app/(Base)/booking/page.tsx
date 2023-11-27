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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        <div className="relative mx-auto  mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-sky-300/40 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
            Book an Service
          </h1>
          <p className="mt-6 text-lg text-white">
            Get a Photo shoot with our experienced
            photographer
          </p>
          <img
            className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
            src="https://i0.wp.com/hdev.co.nz/wp-content/uploads/2014/10/wedding-395.jpg?ssl=1"
            alt=""
          />
        </div>

        <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
          <div className="">
            <p className=" text-xl font-bold ">
              Provide Booking Information
            </p>
            <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="e.g Jhon Doe"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    placeholder="eg: fatickchare,chattogram,bangladesh"
                  />
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="snap@example.com"
                />
              </div>
              <div className="relative">
                <Label htmlFor="zip">Zip code</Label>
                <Input
                  type="number"
                  id="zip"
                  placeholder="e.g. 4035"
                />
              </div>
              <div className="relative">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  type="number"
                  id="phone"
                  placeholder="e.g. +88018365541"
                />
              </div>
            </div>
          </div>

          <div className="">
            <p className="mt-8  text-xl font-bold ">
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
