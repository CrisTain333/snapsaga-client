"use client";
import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const page = () => {
  const { data } = useGetBookingsQuery();

  console.log(data);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent Bookings
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Service Name</TableHead>
            {/* <TableHead>Price</TableHead> */}
            <TableHead>Amount</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((e: any) => (
            <TableRow>
              <TableCell className="font-medium">
                {e?.service?.title}
              </TableCell>
              <TableCell>${e?.service?.price}</TableCell>
              <TableCell>
                <span
                  className={`${
                    e?.status === "pending" &&
                    "bg-yellow-100 text-yellow-600 text-base rounded-md px-2 p-1"
                  } ${
                    e?.status === "canceled" &&
                    "bg-red-100 text-red-600 text-base rounded-md px-2 p-1"
                  } ${
                    e?.status === "confirmed" &&
                    "bg-green-100 text-green-600 text-base rounded-md px-2 p-1"
                  } `}
                >
                  {e?.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <Button className="bg-red-500 text-white">
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
