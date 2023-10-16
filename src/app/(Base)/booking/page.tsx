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
      <div className="mt-5">
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
      </div>
    </div>
  );
};

export default page;
