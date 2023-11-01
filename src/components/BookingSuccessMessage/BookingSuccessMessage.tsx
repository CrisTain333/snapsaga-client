"use client";
import Link from "next/link";
import { Button } from "../ui/button";

const OrderSuccess = () => {
  return (
    <div>
      <div className="mt-20">
        <div>
          <div className="-mt-10">
            <h5 className="text-center  mt-10  text-[#000000d4] font-mono font-bold text-4xl">
              Service Booking successfully 😍
            </h5>
          </div>
          <div className="mb-36 flex items-center justify-center my-8 ">
            <Link href="/dashboard/booking">
              <Button className="bg-green-500 text-lg py-2 px-7 rounded-md text-white">
                See Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
