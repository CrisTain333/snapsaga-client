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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Navigation2 } from "lucide-react";

const page = () => {
  const { data } = useGetBookingsQuery();

  return (
    <div>
      <Table>
        <TableCaption>Track Bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Service Name</TableHead>
            {/* <TableHead>Price</TableHead> */}
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((e: any) => (
            <TableRow key={e?.id}>
              <TableCell className="font-medium">
                {e?.service?.title}
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <Sheet>
                    <SheetTrigger>
                      <Button className="bg-sky-500 text-white">
                        <Navigation2 size={20} />
                        <span className="ml-2">
                          Track Booking
                        </span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader></SheetHeader>
                      <SheetDescription className="flex h-full text-2xl font-bold items-center justify-center">
                        {e?.status === "pending" && (
                          <p className="text-blue-500">
                            Your Booking is Still Pending
                          </p>
                        )}
                        {e?.status === "confirmed" && (
                          <p className="text-green-500">
                            Your Booking has ben Confirmed
                          </p>
                        )}
                        {e?.status === "canceled" && (
                          <p className="text-red-500">
                            Your Booking has ben Canceled
                          </p>
                        )}
                      </SheetDescription>
                    </SheetContent>
                  </Sheet>
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
